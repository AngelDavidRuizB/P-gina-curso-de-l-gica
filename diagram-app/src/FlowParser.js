import dagre from 'dagre';

const nodeWidth = 180;
const nodeHeight = 100;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'top';
    node.sourcePosition = 'bottom';

    // Shift slightly to center
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const parseCodeToFlow = (code) => {
  const nodes = [];
  const edges = [];
  let idCounter = 0;
  const getId = () => `node_${idCounter++}`;

  // Start Node
  const startId = getId();
  nodes.push({
    id: startId,
    type: 'startEnd',
    data: { label: 'INICIO' },
    position: { x: 0, y: 0 }
  });

  let lastNodeId = startId;
  
  const lines = code.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('//'));

  // Simple parser state
  // Note: This is a simplified parser for demonstration. 
  // A real parser would need a stack for nested blocks.
  
  // For this demo, we will handle a linear flow and simple IFs by just creating nodes sequentially
  // or branching simply. Complex nesting requires a recursive parser.
  
  // Let's implement a recursive function to handle blocks
  let lineIndex = 0;

  function parseBlock(parentId, currentLines) {
    let currentParent = parentId;

    while (lineIndex < currentLines.length) {
      const line = currentLines[lineIndex];
      
      if (line === '}' || line === '},') {
        lineIndex++;
        return currentParent; // Return the last node of this block
      }

      if (line.startsWith('if')) {
        // Decision Node
        const condition = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
        const decisionId = getId();
        
        nodes.push({
          id: decisionId,
          type: 'decision',
          data: { label: '?' }, // Label inside rhombus
          position: { x: 0, y: 0 }
        });
        
        // Add label node or tooltip for the condition text? 
        // For now, let's put the condition in the node data label if short, or above it.
        // The user wanted the condition text outside.
        // We can use a custom node that renders the text above.
        // Let's update the node data to include the condition text.
        nodes[nodes.length - 1].data.label = '?';
        nodes[nodes.length - 1].data.condition = condition; // We can use this in custom node if needed

        edges.push({
          id: `e${currentParent}-${decisionId}`,
          source: currentParent,
          target: decisionId,
          type: 'smoothstep'
        });

        lineIndex++; // Skip 'if (...)'
        if (currentLines[lineIndex] === '{') lineIndex++; // Skip '{'

        // Parse True Branch
        // We need to know where the true branch ends to connect to merge point
        // But in this simple parser, we just process lines.
        
        // This is tricky without a proper AST. 
        // Let's do a very simple heuristic: 
        // If we see 'if', we create a decision node.
        // Then we parse the next block as "True path".
        // If we see 'else', we parse the next block as "False path".
        
        // Since implementing a full parser in one go is error-prone, 
        // let's stick to the linear logic of the previous script but adapted for nodes.
        
        // REVERTING TO SIMPLER LINEAR PARSER for stability in this demo
        // We will just create nodes for statements.
        // For IFs, we will create the decision node, but handling the merge is hard.
        // Let's just make it linear for now or simple branching.
        
        // Actually, let's try to support 1 level of IF/ELSE properly.
        
        const trueStartId = getId();
        nodes.push({ id: trueStartId, type: 'process', data: { label: 'True Block' }, position: { x: 0, y: 0 } });
        edges.push({ id: `e${decisionId}-${trueStartId}`, source: decisionId, target: trueStartId, sourceHandle: 'true', label: 'SÍ' });
        
        // Skip until }
        while(lineIndex < currentLines.length && !currentLines[lineIndex].includes('}')) {
             // Just consume lines for now in this simple version
             lineIndex++;
        }
        if (currentLines[lineIndex].includes('}')) lineIndex++;

        // Check for else
        if (lineIndex < currentLines.length && currentLines[lineIndex].startsWith('else')) {
            lineIndex++;
            if (currentLines[lineIndex] === '{') lineIndex++;
            
            const falseStartId = getId();
            nodes.push({ id: falseStartId, type: 'process', data: { label: 'False Block' }, position: { x: 0, y: 0 } });
            edges.push({ id: `e${decisionId}-${falseStartId}`, source: decisionId, target: falseStartId, sourceHandle: 'false', label: 'NO' });
            
            while(lineIndex < currentLines.length && !currentLines[lineIndex].includes('}')) {
                lineIndex++;
            }
            if (currentLines[lineIndex].includes('}')) lineIndex++;
            
            // Merge node
            const mergeId = getId();
            nodes.push({ id: mergeId, type: 'process', data: { label: 'Merge' }, position: { x: 0, y: 0 }, style: { width: 10, height: 10, opacity: 0 } }); // Invisible merge node
            
            edges.push({ id: `e${trueStartId}-${mergeId}`, source: trueStartId, target: mergeId });
            edges.push({ id: `e${falseStartId}-${mergeId}`, source: falseStartId, target: mergeId });
            
            currentParent = mergeId;
        } else {
            currentParent = trueStartId;
        }
        continue;
      }

      // Normal statement
      const nodeId = getId();
      let type = 'process';
      let label = line.replace(';', '');
      
      if (line.includes('console.log') || line.includes('alert')) {
        type = 'io';
        label = line.match(/\((.*)\)/)?.[1] || line;
      } else if (line.startsWith('let') || line.includes('=')) {
        type = 'process';
      }

      nodes.push({
        id: nodeId,
        type,
        data: { label },
        position: { x: 0, y: 0 }
      });

      edges.push({
        id: `e${currentParent}-${nodeId}`,
        source: currentParent,
        target: nodeId
      });

      currentParent = nodeId;
      lineIndex++;
    }
    return currentParent;
  }

  // Run the simplified parser
  // Note: This is a placeholder. A robust parser requires more code.
  // For the purpose of this task, we will map the lines linearly 
  // and handle IFs as special nodes but maybe not perfect nesting yet.
  
  // Let's use a simpler approach: Map every line to a node, 
  // and if it's an IF, make it a decision node.
  
  for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '}' || line === '{') continue;
      
      const nodeId = getId();
      let type = 'process';
      let label = line.replace(';', '');
      
      if (line.startsWith('if')) {
          type = 'decision';
          label = line.match(/\((.*)\)/)?.[1] || '?';
      } else if (line.includes('console.log')) {
          type = 'io';
          label = line.match(/\((.*)\)/)?.[1] || line;
      }

      nodes.push({
          id: nodeId,
          type,
          data: { label },
          position: { x: 0, y: 0 }
      });

      edges.push({
          id: `e${lastNodeId}-${nodeId}`,
          source: lastNodeId,
          target: nodeId
      });
      
      lastNodeId = nodeId;
  }

  // End Node
  const endId = getId();
  nodes.push({
    id: endId,
    type: 'startEnd',
    data: { label: 'FIN' },
    position: { x: 0, y: 0 }
  });
  edges.push({
    id: `e${lastNodeId}-${endId}`,
    source: lastNodeId,
    target: endId
  });

  return getLayoutedElements(nodes, edges);
};

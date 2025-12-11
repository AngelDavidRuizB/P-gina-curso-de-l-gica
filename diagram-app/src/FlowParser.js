import dagre from 'dagre';

const nodeWidth = 180;
const nodeHeight = 100;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  try {
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
    });
  } catch (error) {
    console.error('Dagre layout error:', error);
    // Fallback: simple vertical layout if dagre fails
    nodes.forEach((node, index) => {
      node.position = { x: 0, y: index * 150 };
    });
  }

  return { nodes, edges };
};

export const parseCodeToFlow = (code) => {
  console.log("parseCodeToFlow started with:", code);
  const nodes = [];
  const edges = [];
  let idCounter = 0;
  const getId = () => 'node_' + idCounter++;

  // Start Node
  const startId = getId();
  nodes.push({
    id: startId,
    type: 'startEnd',
    data: { label: 'INICIO' },
    position: { x: 0, y: 0 }
  });

  let lastNodeId = startId;
  
  if (!code) {
    console.log("No code provided, returning early");
    return { nodes, edges };
  }

  const lines = code.split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('//'));

  for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip braces for now in this simple linear parser
      if (line === '}' || line === '{') continue;
      
      const nodeId = getId();
      let type = 'process';
      let label = line.replace(';', '');
      
      if (line.startsWith('if')) {
          type = 'decision';
          // Extract condition: if (x > 0) -> x > 0
          const match = line.match(/\((.*)\)/);
          label = match ? match[1] : '?';
      } else if (line.includes('console.log') || line.includes('alert') || line.includes('prompt')) {
          type = 'io';
          const match = line.match(/\((.*)\)/);
          label = match ? match[1] : line;
      } else if (line.startsWith('let ') || line.startsWith('const ') || line.startsWith('var ')) {
          type = 'process';
      }

      nodes.push({
          id: nodeId,
          type,
          data: { label },
          position: { x: 0, y: 0 }
      });

      edges.push({
          id: 'e' + lastNodeId + '-' + nodeId,
          source: lastNodeId,
          target: nodeId,
          type: 'smoothstep'
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
    id: 'e' + lastNodeId + '-' + endId,
    source: lastNodeId,
    target: endId,
    type: 'smoothstep'
  });

  console.log("Before layout - nodes:", nodes.length, "edges:", edges.length);
  const result = getLayoutedElements(nodes, edges);
  console.log("After layout - result:", result);
  return result;
};

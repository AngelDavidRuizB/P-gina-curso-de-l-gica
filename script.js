// ================================================
// Laboratorio de Lógica - Motor de Animaciones Didácticas
// ================================================

// --- Sistema de Navegación ---
const navButtons = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('[data-section]');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        
        // Toggle immersive mode for diagram section
        if (target === 'diagrama') {
            document.body.classList.add('immersive-mode');
        } else {
            document.body.classList.remove('immersive-mode');
        }

        // Actualizar botones
        navButtons.forEach(b => b.classList.toggle('active', b === btn));
        
        // Actualizar paneles
        panels.forEach(p => {
            if (p.id === target) {
                p.classList.remove('hidden');
                // Pequeña animación de entrada
                p.style.opacity = '0';
                setTimeout(() => p.style.opacity = '1', 50);
            } else {
                p.classList.add('hidden');
            }
        });
    });
});

// --- Referencias a áreas visuales ---
const visuals = {
    variables: document.querySelector('[data-visual="variables"]'),
    condicionales: document.querySelector('[data-visual="condicionales"]'),
    for: document.querySelector('[data-visual="for"]'),
    while: document.querySelector('[data-visual="while"]'),
    anidados: document.querySelector('[data-visual="anidados"]'),
    estructuras: document.querySelector('[data-visual="estructuras"]'),
    funciones: document.querySelector('[data-visual="funciones"]'),
    diagrama: document.querySelector('[data-visual="diagrama"]')
};

// --- Funciones de Animación Didáctica ---

// 1. Variables: "Cajas de memoria"
window.crearVariable = function(nombre, valor) {
    const area = visuals.variables;
    
    const card = document.createElement('div');
    card.className = 'variable-box';
    
    const nameEl = document.createElement('div');
    nameEl.className = 'var-name';
    nameEl.textContent = nombre;
    
    const valEl = document.createElement('div');
    valEl.className = 'var-value';
    
    // Si es string, poner comillas visuales
    if (typeof valor === 'string') {
        valEl.textContent = `"${valor}"`;
        valEl.style.color = '#4013e3ff'; // Cyan claro para strings
    } else {
        valEl.textContent = valor;
        valEl.style.color = '#e8690eff'; // Amarillo para números
    }
    
    card.appendChild(nameEl);
    card.appendChild(valEl);
    area.appendChild(card);
};

// 2. Condicionales: "Diagrama de flujo"
window.animarCondicional = function(condicion, textoCondicion) {
    const area = visuals.condicionales;
    
    const container = document.createElement('div');
    container.className = 'flow-container';
    
    // Nodo Inicio
        container.innerHTML = `
        <div class="flow-node">Inicio</div>
        <div style="height: 20px; border-left: 2px solid #64748b;"></div>
        
        <!-- Etiqueta de la condición (fuera del rombo) -->
        <div class="fc-condition-label" style="margin-bottom: 0;">${textoCondicion || 'Condición'}</div>
        
        <!-- Rombo de decisión (clase unificada fc-decision) -->
        <div class="fc-decision" style="width: 120px; height: 84px;">
            <span>?</span>
        </div>
        
        <div class="flow-branch">
            <div class="branch-path ${condicion ? 'active' : ''}">
                <span class="branch-label">VERDADERO</span>
                <div style="height: 30px; border-left: 2px dashed currentColor;"></div>
                <div class="flow-node" style="border-color: var(--success)">Ejecutar Bloque IF</div>
            </div>
            <div class="branch-path ${!condicion ? 'active' : ''}">
                <span class="branch-label">FALSO</span>
                <div style="height: 30px; border-left: 2px dashed currentColor;"></div>
                <div class="flow-node" style="border-color: var(--danger)">Ejecutar Bloque ELSE</div>
            </div>
        </div>
    `;
    
    area.appendChild(container);
};

// 3. Ciclo For: "Pista de iteraciones"
window.animarCicloFor = function(i, total) {
    const area = visuals.for;
    
    // Si es la primera iteración (o no existe el track), crearlo
    let track = area.querySelector('.loop-track');
    if (!track) {
        track = document.createElement('div');
        track.className = 'loop-track';
        area.appendChild(track);
    }
    
    const step = document.createElement('div');
    step.className = 'loop-step current';
    step.textContent = i;
    step.title = `Iteración ${i}`;
    
    // Quitar clase 'current' a los anteriores
    const prev = track.querySelectorAll('.loop-step');
    prev.forEach(p => p.classList.remove('current'));
    
    track.appendChild(step);
};

// 4. Ciclo While: "Verificar y Actuar"
window.animarCicloWhile = function(condicion, i) {
    const area = visuals.while;
    
    let track = area.querySelector('.loop-track');
    if (!track) {
        track = document.createElement('div');
        track.className = 'loop-track';
        area.appendChild(track);
    }
    
    const step = document.createElement('div');
    step.className = 'loop-step condition-step'; // Añadimos clase para estilo rombo
    
    if (condicion) {
        step.classList.add('current');
        step.innerHTML = `<span>${i}</span>`; // Span necesario para contrarrestar rotación
        step.style.borderColor = 'var(--success)';
    } else {
        step.innerHTML = `<span>🛑</span>`;
        step.style.borderColor = 'var(--danger)';
        step.style.background = 'rgba(239, 68, 68, 0.2)';
    }
    
    track.appendChild(step);
};

// 5. Ciclos Anidados: "Grid de coordenadas"
window.animarAnidado = function(fila, col, totalFilas, totalCols) {
    const area = visuals.anidados;
    
    // Buscar o crear grid
    let grid = area.querySelector('.grid-container');
    if (!grid) {
        grid = document.createElement('div');
        grid.className = 'grid-container';
        grid.style.gridTemplateColumns = `repeat(${totalCols}, 1fr)`;
        
        // Pre-llenar celdas vacías
        for(let r=0; r<totalFilas; r++) {
            for(let c=0; c<totalCols; c++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.r = r;
                cell.dataset.c = c;
                cell.textContent = `${r},${c}`;
                grid.appendChild(cell);
            }
        }
        area.appendChild(grid);
    }
    
    // Iluminar celda actual
    const cell = grid.querySelector(`.grid-cell[data-r="${fila}"][data-c="${col}"]`);
    if (cell) {
        // Quitar active de otros para efecto de "escaneo"
        const actives = grid.querySelectorAll('.active');
        actives.forEach(a => a.classList.remove('active'));
        
        cell.classList.add('active');
        // Dejar rastro
        cell.style.borderColor = 'var(--accent)';
        cell.style.color = 'black';
    }
};

// 6. Estructuras: "Casilleros de Array"
window.animarArray = function(arr) {
    const area = visuals.estructuras;
    
    const container = document.createElement('div');
    container.className = 'array-container';
    
    arr.forEach((valor, index) => {
        const item = document.createElement('div');
        item.className = 'array-item';
        
        const valBox = document.createElement('div');
        valBox.className = 'array-val';
        valBox.textContent = valor;
        
        const idxLabel = document.createElement('div');
        idxLabel.className = 'array-idx';
        idxLabel.textContent = `index ${index}`;
        
        item.appendChild(valBox);
        item.appendChild(idxLabel);
        container.appendChild(item);
    });
    
    area.appendChild(container);
};

// 7. Funciones: "Máquina de Procesamiento"
window.animarFuncion = function(nombre, entradas, salida) {
    const area = visuals.funciones;
    
    const machine = document.createElement('div');
    machine.className = 'func-machine';
    
    const inBox = document.createElement('div');
    inBox.className = 'func-in';
    inBox.textContent = `IN: ${JSON.stringify(entradas)}`;
    
    const procBox = document.createElement('div');
    procBox.className = 'func-process';
    procBox.textContent = nombre + '()';
    
    const outBox = document.createElement('div');
    outBox.className = 'func-out';
    outBox.textContent = `OUT: ${salida}`;
    
    machine.appendChild(inBox);
    machine.appendChild(procBox);
    machine.appendChild(outBox);
    
    area.appendChild(machine);
};

// Helper para errores
function mostrarError(area, err) {
    const errorBox = document.createElement('div');
    errorBox.style.color = '#ef4444';
    errorBox.style.background = 'rgba(239,68,68,0.1)';
    errorBox.style.padding = '10px';
    errorBox.style.borderRadius = '4px';
    errorBox.style.border = '1px solid #ef4444';
    errorBox.innerHTML = `<strong>Error:</strong> ${err.message}`;
    area.appendChild(errorBox);
}

// 8. Generador de Diagramas (Parser Simplificado)
function generarDiagrama(code, area) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flowchart-wrapper';
    
    // Contador para animaciones escalonadas
    let nodeIndex = 0;
    const getDelay = () => (nodeIndex++ * 0.1) + 's';
    
    // Nodo Inicio (Terminal)
    addNode(wrapper, 'INICIO', 'start-end', getDelay());
    addArrow(wrapper);

    // Limpiar comentarios y líneas vacías
    const lines = code.split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('//'));

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith('let ') || line.startsWith('const ') || line.startsWith('var ') || line.includes(' = ')) {
            // Asignación
            const varMatch = line.match(/(let|const|var)\s+(\w+)\s*=\s*(.+);?/);
            let displayText = line.replace(';', '');
            if (varMatch) {
                displayText = `${varMatch[2]} ← ${varMatch[3].replace(';', '')}`;
            }
            addNode(wrapper, displayText, 'process', getDelay());
            addArrow(wrapper);
            i++;
        } else if (line.startsWith('console.log') || line.startsWith('alert')) {
            // Entrada/Salida
            let content = line;
            if (line.includes('(')) content = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
            addNode(wrapper, content, 'io', getDelay());
            addArrow(wrapper);
            i++;
        } else if (line.startsWith('if')) {
            // Condicional
            let condition = 'Condición';
            if (line.includes('(')) condition = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
            
            const decisionWrapper = document.createElement('div');
            decisionWrapper.className = 'fc-decision-wrapper';
            
            // Etiqueta de condición
            const label = document.createElement('div');
            label.className = 'fc-condition-label';
            label.textContent = condition;
            decisionWrapper.appendChild(label);
            
            const decision = document.createElement('div');
            decision.className = 'fc-decision';
            // Forzar tamaño mínimo para el rombo en el generador
            decision.style.minWidth = '110px';
            decision.style.minHeight = '84px';
            decision.style.animationDelay = getDelay();
            decision.innerHTML = `<span>?</span>`;
            decision.title = condition;
            decisionWrapper.appendChild(decision);

            const branches = document.createElement('div');
            branches.className = 'fc-branches';
            
            // Rama True
            const trueBranch = document.createElement('div');
            trueBranch.className = 'fc-branch';
            const trueLabelEl = document.createElement('div');
            trueLabelEl.className = 'fc-branch-label true';
            trueLabelEl.innerHTML = '✓ SÍ';
            trueBranch.appendChild(trueLabelEl);
            const trueNode = document.createElement('div');
            trueNode.className = 'fc-node fc-process';
            trueNode.style.animationDelay = getDelay();
            trueNode.textContent = 'Ejecutar bloque IF';
            trueBranch.appendChild(trueNode);
            
            // Rama False
            const falseBranch = document.createElement('div');
            falseBranch.className = 'fc-branch';
            const falseLabelEl = document.createElement('div');
            falseLabelEl.className = 'fc-branch-label false';
            falseLabelEl.innerHTML = '✗ NO';
            falseBranch.appendChild(falseLabelEl);
            const falseNode = document.createElement('div');
            falseNode.className = 'fc-node fc-process';
            falseNode.style.animationDelay = getDelay();
            falseNode.textContent = 'Ejecutar bloque ELSE';
            falseBranch.appendChild(falseNode);
            
            branches.appendChild(trueBranch);
            branches.appendChild(falseBranch);
            
            decisionWrapper.appendChild(branches);
            wrapper.appendChild(decisionWrapper);
            
            addArrow(wrapper);
            
            // Avanzar simplificadamente hasta cerrar llaves
            let openBraces = 0;
            if (line.includes('{')) openBraces++;
            i++;
            while(i < lines.length && (openBraces > 0 || lines[i].includes('else'))) {
                if (lines[i].includes('{')) openBraces++;
                if (lines[i].includes('}')) openBraces--;
                i++;
            }
        } else if (line.startsWith('while') || line.startsWith('for')) {
             let condition = 'Ciclo';
             if (line.includes('(')) condition = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
             
             // Wrapper para decisión (Ciclo)
             const decisionWrapper = document.createElement('div');
             decisionWrapper.className = 'fc-decision-wrapper';

             const label = document.createElement('div');
             label.className = 'fc-condition-label';
             label.textContent = condition;
             decisionWrapper.appendChild(label);

             const decision = document.createElement('div');
             decision.className = 'fc-decision fc-loop';
            decision.style.minWidth = '110px';
            decision.style.minHeight = '84px';
             decision.style.animationDelay = getDelay();
             decision.innerHTML = `<span>WHILE</span>`;
             decisionWrapper.appendChild(decision);
             
             wrapper.appendChild(decisionWrapper);

             addArrow(wrapper);
             addNode(wrapper, 'Cuerpo del ciclo', 'process', getDelay());
             addArrow(wrapper);
             
             let openBraces = 0;
             if (line.includes('{')) openBraces++;
             i++;
             while(i < lines.length && openBraces > 0) {
                 if (lines[i].includes('{')) openBraces++;
                 if (lines[i].includes('}')) openBraces--;
                 i++;
             }
        } else {
            // Genérico
            if (!line.includes('}') && line.length > 1) {
                addNode(wrapper, line.replace(';', ''), 'process', getDelay());
                addArrow(wrapper);
            }
            i++;
        }
    }

    // Nodo Fin
    // Remover última flecha si existe
    if (wrapper.lastChild && wrapper.lastChild.className === 'fc-arrow') {
        wrapper.removeChild(wrapper.lastChild);
    }
    addArrow(wrapper);
    addNode(wrapper, 'FIN', 'start-end', getDelay());
    area.appendChild(wrapper);
}

function addNode(parent, text, type, delay = '0s') {
    if (type === 'decision') {
         const d = document.createElement('div');
         d.className = 'fc-decision';
            d.style.minWidth = '110px';
            d.style.minHeight = '84px';
         d.style.animationDelay = delay;
         d.innerHTML = `<span>${text}</span>`;
         parent.appendChild(d);
         return;
    }
    
    const node = document.createElement('div');
    node.className = `fc-node fc-${type}`;
    node.style.animationDelay = delay;
    
    if (type === 'io') {
        const span = document.createElement('span');
        span.textContent = text;
        node.appendChild(span);
    } else {
        node.textContent = text;
    }
    parent.appendChild(node);
}

function addArrow(parent) {
    const arrow = document.createElement('div');
    arrow.className = 'fc-arrow';
    parent.appendChild(arrow);
}


// --- Motor de Ejecución ---
function runCode(sectionKey) {
    const textarea = document.getElementById(`code-${sectionKey}`);
    const code = textarea.value;
    const area = visuals[sectionKey];
    
    // 1. Limpiar área visual antes de ejecutar
    area.innerHTML = '';

    // Caso especial para el generador de diagramas
    if (sectionKey === 'diagrama') {
        try {
            generarDiagrama(code, area);
        } catch (err) {
            mostrarError(area, err);
        }
        return;
    }
    
    try {
        // 2. Ejecutar código del estudiante
        // Usamos new Function para un sandbox básico
        const fn = new Function(code);
        fn();
    } catch (err) {
        // Manejo de errores visual
        const errorBox = document.createElement('div');
        errorBox.style.color = '#ef4444';
        errorBox.style.background = 'rgba(239,68,68,0.1)';
        errorBox.style.padding = '10px';
        errorBox.style.borderRadius = '4px';
        errorBox.style.border = '1px solid #ef4444';
        errorBox.innerHTML = `<strong>Error:</strong> ${err.message}`;
        area.appendChild(errorBox);
    }
}

// Conectar botones
document.querySelectorAll('[data-run]').forEach(btn => {
    btn.addEventListener('click', () => runCode(btn.dataset.run));
});

// Mensaje de bienvenida en consola
console.log('Laboratorio de Lógica iniciado. ¡Listo para aprender!');

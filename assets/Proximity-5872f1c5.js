import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as r}from"./index-2ef8b458.js";import{M as a}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",hr:"hr",p:"p",code:"code",h2:"h2",pre:"pre",a:"a"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Docs/Helpers/Proximity"}),`
`,e.jsx(n.h1,{id:"proximity",children:"Proximity"}),`
`,e.jsx(n.hr,{}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useProximity"}),` hook allows you to use the distance
from a node to link them rather than when the mouse
enter/leaves the node. This is most useful for editor
style interfaces when a user is dragging a element
onto the canvas and wants to drop the node intelligently.`]}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(n.p,{children:["To get started, let's import the ",e.jsx(n.code,{children:"useProximity"}),` hook
and setup a drag and drop interface using `,e.jsx(n.code,{children:"framer-motion"}),`.
Below we will create a simple example ( referrer to demo for
functional demo ) and walk through each step. The example
might seem large but it's meant to be overly verbose for
educational purposes.`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import React, { useState, useRef } from 'react';
import { useProximity, CanvasRef, addNodeAndEdge, Canvas, EdgeData, NodeData } from 'reaflow';
import { useDragControls } from 'framer-motion';

const App = () => {
  // This is the controls from framer-motion for dragging
  const dragControls = useDragControls();

  // We need to create a reference to the canvas so we can pass
  // it to the hook so it has knowledge about the canvas
  const canvasRef = useRef<CanvasRef | null>(null);

  // We need to determine if we can drop the element onto the canvas
  const [droppable, setDroppable] = useState<boolean>(false);

  // Let's save the node that we have "entered" so that when the user
  // ends the drag we can link it
  const [enteredNode, setEnteredNode] = useState<NodeData | null>(null);

  // Just some empty arrays for demo purposes, this would normally
  // be whatever your graph contains
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [nodes, setNodes] = useState<NodeData[]>([]);

  const {
    // Drag event handlers we need to hook into our drag
    onDragStart: onProximityDragStart,
    onDrag: onProximityDrag,
    onDragEnd: onProximityDragEnd
  } = useProximity({
    // The ref we defined above
    canvasRef,
    onMatchChange: (match: string | null) => {
      // If there is a match, let's find the node in
      // our models here
      let matchNode: NodeData | null = null;
      if (match) {
        matchNode = nodes.find(n => n.id === match);
      }

      // Now let's set the matched node
      setEnteredNode(matchNode);

      // We set this seperately from the enteredNode because
      // you might want to do some validation on whether you can drop or not
      setDroppable(matchNode !== null);
    }
  });

  const onDragStart = (event) => {
    // Call the hook's drag start
    onProximityDragStart(event);

    // Have the drag snap to our cursor
    dragControls.start(event, { snapToCursor: true });
  };

  const onDragEnd = (event) => {
    // Call our proximity to let it know we are done dragging
    onProximityDragEnd(event);

    // If its droppable let's add it to the canvas
    if (droppable) {
      // Let's use our addNodeAndEdge helper function
      const result = addNodeAndEdge(
        nodes,
        edges,
        // Make this whatever you want to drop
        {
          id: 'random',
          text: 'random'
        },
        // Let's add it using the closest node
        enteredNode
      );

      // Update our edges and nodes
      setNodes(result.nodes);
      setEdges(result.edges);
    }

    // Reset the drop state
    setDroppable(false);
    setEnteredNode(null);
  };

  return (
    <div>
      <motion.div className="block" onMouseDown={onDragStart}>
        Drag Me!
      </motion.div>
      <motion.div
        drag
        dragControls={dragControls}
        onDrag={onProximityDrag}
        onDragEnd={onDragEnd}
      >
        {activeDrag && (
          <div>
            Dragger!
          </div>
        )}
      </motion.div>
      <Canvas
        ref={canvasRef}
        nodes={nodes}
        edges={edges}
      />
    </div>
  )
}
`})}),`
`,e.jsxs(n.p,{children:["Note: You don't have to use ",e.jsx(n.code,{children:"framer-motion"})," but since ",e.jsx(n.code,{children:"reaflow"}),`
uses it internally its probably best to stick with that.`]}),`
`,e.jsx(n.h2,{id:"interfaces",children:"Interfaces"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"useProximity"})," hook accepts the following properties:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`export interface ProximityProps {
  /**
   * Disable proximity or not.
   */
  disabled?: boolean;

  /**
   * Min distance required before match is made. Default is 40.
   */
  minDistance?: number;

  /**
   * Ref pointer to the canvas.
   */
  canvasRef?: RefObject<CanvasRef>;

  /**
   * Distance from the match.
   */
  onDistanceChange?: (distance: number | null) => void;

  /**
   * When a match state has changed.
   */
  onMatchChange?: (matche: string | null, distance: number | null) => void;

  /**
   * When the pointer intersects a node.
   */
  onIntersects?: (matche: string | null) => void;
}
`})}),`
`,e.jsx(n.p,{children:"and it returns the following interface:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`export interface ProximityResult {
  /**
   * The matched id of the node.
   */
  match: string | null;

  /**
   * Event for drag started.
   */
  onDragStart: (event: PointerEvent) => void;

  /**
   * Event for active dragging.
   */
  onDrag: (event: PointerEvent) => void;

  /**
   * Event for drag ended.
   */
  onDragEnd: (event: PointerEvent) => void;
}
`})}),`
`,e.jsx(n.h2,{id:"how-it-works",children:"How it works"}),`
`,e.jsxs(n.p,{children:[`Under the hood it will coorelate the mouse pointer position
to the canvas ( including offset and zoom ) using `,e.jsx(n.a,{href:"https://github.com/thelonious/kld-affine",target:"_blank",rel:"nofollow noopener noreferrer",children:"kld-affine"}),`
which is a geometric matrices library.`]}),`
`,e.jsxs(n.p,{children:[`Next as the user drags it will measure the distance of all the nodes
relative to the mouse pointer position and if find the node with
the closest distance and determine if it falls in the threshold
which by default is `,e.jsx(n.code,{children:"40"}),"."]})]})}function x(t={}){const{wrapper:n}=Object.assign({},r(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(o,t)})):o(t)}export{x as default};

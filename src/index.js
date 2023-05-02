import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import * as Socket from './socket-connection.js'
import { MenuHandler } from './menu.js';

function deg2rad(degrees) {
	return degrees * Math.PI / 180
}

function updateGraph(json) {
	const data = JSON.parse(json)
	const { nodes, links } = data;
	Graph.graphData({ nodes, links });
}

function connect(url, sub) {
	Socket.disconnect()
	Socket.connect(url, sub, updateGraph)
}

function update() {
	Socket.send("/app/sample", {name: "example1"});
}

const Graph = ForceGraph3D({
	extraRenderers: [new CSS2DRenderer()]
})(document.getElementById('render'))

const demoGraph = {
	nodes: [...Array(3).keys()].map(i => ({ id: i, name: `q${i + 1}` })),
	links: [
		{ source: 0, target: 1, curvature: 0.5, rotation: 30, label: 'a' },
		{ source: 0, target: 1, curvature: 0.5, rotation: 210, label: 'b' },
		{ source: 1, target: 1, curvature: 0.5, rotation: 190, label: 'a' },
		{ source: 1, target: 2, curvature: 0.5, rotation: 0, label: 'b' },
	]
};
demoGraph.links = demoGraph.links.map(link => ({...link, rotation: deg2rad(link.rotation)}));

Graph.linkCurvature('curvature')
	.linkCurveRotation('rotation')
	.linkDirectionalParticles(2)
	.graphData(demoGraph)
	.nodeThreeObject(node => {
		const nodeEl = document.createElement('div');
		nodeEl.textContent = node.name;
		nodeEl.className = 'node-label';
		return new CSS2DObject(nodeEl);
	})
	.nodeThreeObjectExtend(true)
	.linkThreeObjectExtend(true)
	.linkThreeObject(link => {
		// extend link with text sprite
		const sprite = new SpriteText(link.label);
		sprite.color = 'lightgrey';
		sprite.textHeight = 1.5;
		return sprite;
	})
	.linkPositionUpdate((sprite, { start, end }) => {
		const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
			[c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
		})));

		// Position sprite
		Object.assign(sprite.position, middlePos);
	});

MenuHandler(connect, update);
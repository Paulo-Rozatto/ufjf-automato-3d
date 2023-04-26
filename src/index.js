import ForceGraph3D from '3d-force-graph';
import SpriteText from 'three-spritetext';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

function deg2rad(degrees) {
	return degrees * Math.PI / 180
}

const gData = {
	nodes: [...Array(5).keys()].map(i => ({ id: i, name: `q${i + 1}` })),
	links: [
		{ source: 0, target: 1, curvature: 0.5, rotation: 30, label: 'a' },
		{ source: 0, target: 1, curvature: 0.5, rotation: 210, label: 'b' },
		{ source: 1, target: 1, curvature: 0.5, rotation: 190, label: 'a' },
		{ source: 1, target: 2, curvature: 0.5, rotation: 0, label: 'b' },
		{ source: 1, target: 3, curvature: 0.5, rotation: 0, label: 'a' },
		{ source: 2, target: 3, curvature: 0, rotation: 0, label: 'a' },
		{ source: 2, target: 4, curvature: 0, rotation: 0, label: 'b' },
		{ source: 3, target: 4, curvature: 0, rotation: 0, label: 'a' },
	]
};
gData.links = gData.links.map(link => {
	link.rotation = deg2rad(link.rotation);
	return link;
})

const Graph = ForceGraph3D({
	extraRenderers: [new CSS2DRenderer()]
})
	(document.getElementById('render'))
	.linkCurvature('curvature')
	.linkCurveRotation('rotation')
	.linkDirectionalParticles(2)
	.graphData(gData)
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
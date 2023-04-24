import { BufferGeometry, CatmullRomCurve3, Line, Line3, LineBasicMaterial, LineCurve3, PerspectiveCamera, Scene, TubeGeometry, WebGLRenderer } from "three";
import { buildState } from "./components";
import { spring_eades } from "./drawing";

// init
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);
camera.position.z = 20;

const scene = new Scene();

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.querySelector("#render").appendChild(renderer.domElement);

const states = [];
let y = 2;
for (let i = 0; i < 5; i++) {
	const estado = buildState();
	let edge1 = i + 1, edge2 = i + 2;
	y *= -1;

	if (edge1 > 4) {
		edge1 -= 5;
	}
	if (edge2 > 4) {
		edge2 -= 5;
	}

	estado.edges = [edge1, edge2];
	// estado.position.x = 5 * (-2 + i);
	// estado.position.y = y;
	estado.position.x = Math.random() * 20 - 10;
	estado.position.y = Math.random() * 20 - 10;

	scene.add(estado);
	states.push(estado);
}

// spring_eades(states);
addEventListener('keydown', (e) => {
	if (e.key == 'Enter') {
		removeLines();
		spring_eades(states);
		createLines();
	}
})

let lines = [];
const lineMaterial = new LineBasicMaterial({ color: 0x0000ff, linewidth: 2 });
createLines();
function createLines() {
	for (const vertex of states) {
		for (const vertexIdx of vertex.edges) {
			const destiny = states[vertexIdx];
			const curve = new CatmullRomCurve3([
				vertex.position,
				destiny.position
			]);

			const points = curve.getPoints(50);
			const geometry = new BufferGeometry().setFromPoints(points);
			const curveObject = new Line(geometry, lineMaterial);
			lines.push(curveObject);
			scene.add(curveObject);
		}
	}
}

function removeLines() {
	for (const line of lines) {
		line.geometry.dispose();
		line.removeFromParent();
	}
	lines.length = 0;
}

// animation

function animation(time) {

	for (let mesh of states) {
		mesh.rotation.x = time / 2000;
		mesh.rotation.y = time / 1000;
	}

	renderer.render(scene, camera);

}
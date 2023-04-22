import { Vector3 } from "three";

export function spring_eades(vertices) {
    const C1 = 1, C2 = 1, C3 = 1, C4 = 0.001;
    const ITERATIONS = 50;

    // TODO: implementar segunda forca do algoritmo (repulsao de vertices nao adjacentes)

    for (let i = 0; i < ITERATIONS; i++) {
        for (let vertex of vertices) {
            for (let edgeIdx of vertex.edges) {
                const destiny = vertices[edgeIdx]; // estado que e conectado pela aresta
                const distance = vertex.position.distanceTo(destiny.position);
                const direction = new Vector3().subVectors(destiny.position, vertex.position).normalize();
                const springForce = C1 / Math.log(distance / C2);
                const displacement = direction.multiplyScalar(springForce * C4);
                vertex.position.add(displacement);
            }
        }
    }
}
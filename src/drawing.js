import { Vector3 } from "three";

// Baseado em https://cs.brown.edu/people/rtamassi/gdhandbook/chapters/force-directed.pdf
// Pagina 385 do livro, pagina 3 do PDF
// O resultado ficou ruim na verdade xD, pelo menos a partir de um layout 100% aleatorio
export function spring_eades(vertices) {
    const C1 = 1, C2 = 3, C3 = -1, C4 = 0.15;
    const ITERATIONS = 50;

    for (let i = 0; i < ITERATIONS; i++) {
        const forces = [];
        for (let j = 0; j < vertices.length; j++) {
            const resultForce = new Vector3();
            const vertex = vertices[j];

            for (let k = 0; k < vertices.length; k++) {
                if (j === k) continue;
                const destiny = vertices[k];
                const squaredDistance = vertex.position.distanceToSquared(destiny.position);
                const direction = new Vector3().subVectors(destiny.position, vertex.position).normalize();
                let force;

                if (vertex.edges.includes(k)) {
                    const distance = Math.sqrt(squaredDistance);
                    force = C1 / Math.log(distance / C2); // forca atrativa da mola
                } else {
                    force = C3 / squaredDistance; // forca repulsiva entre vertices
                }

                direction.multiplyScalar(force * C4);
                resultForce.add(direction);
            }
            const displacement = resultForce.multiplyScalar(C4);
            forces.push(displacement);
        }

        for (let j = 0; j < vertices.length; j++) {
            vertices[j].position.add(forces[j]);
        }
    }
}
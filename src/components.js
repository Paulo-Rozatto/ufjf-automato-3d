import {BoxGeometry, Mesh, MeshNormalMaterial} from 'three';

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshNormalMaterial();

export const buildState = () => {
    return new Mesh(geometry, material);
}
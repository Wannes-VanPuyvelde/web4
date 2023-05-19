import { Light } from '../domain/model/Light';
import LightDB from '../domain/data-access/Light.db';
import { LightInput } from '../types/LightInput';

const getAllLights = async (): Promise<Light[]> => {
    try {
        const lights = await LightDB.getAllLights();
        return lights;
    } catch (error) {
        throw new Error(error);
    }
};

const getLightById = async ( id : number): Promise<Light> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');
  
    const light = await LightDB.getLightById({ id});
  
    if (!light) throw new Error('Light not found');
  
    return light;
  };

const deleteLight = async (id: number): Promise<Light> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');

    const light = await LightDB.deleteLight({ id });

    if (!light) throw new Error('Light not found');

    return light;
};

const updateLight = async (id: number, name:string, time_on:number, light_color:string): Promise<Light> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');

    const light = await LightDB.updateLight({ id, name, time_on, light_color});

    return light;
};

const addLight = async (name:string, time_on:number, light_color:string): Promise<Light> => {
    const light = await LightDB.addLight({ name, time_on, light_color });

    return light;
};

export default { getAllLights, getLightById, deleteLight, updateLight, addLight};

import React from 'react';
import { Plant } from '../../types';

type Props = {
    plants: Array<Plant>;
}

const PlantOverviewTable: React.FC<Props> = ({plants}: Props) => {
    return(
        <>
            <div className='w-100 d-none d-md-block' />
            <div className='col-6'>
                {plants && (
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {plants &&
                        plants.map((plant, index) => (
                            <tr key={index}>
                                <td>{plant.name}</td>
                                <td>{plant.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default PlantOverviewTable;
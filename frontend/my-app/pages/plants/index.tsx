import Head from 'next/head'
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import PlantService from '../../services/PlantService';
import { Plant } from '../../types';
import PlantOverview from '../../components/plants/PlantOverviewTable';


const Plants: React.FC = () => {

    const [plants, setPlants] = useState<Array<Plant>>([]);

    const getPlants = async () => {
        console.log("index-getPlants")
        PlantService.getAllPlants()
        .then((res) => res.json())
        .then((plants) =>  setPlants(plants))
    }

    useEffect(() => {
        console.log("index-useEffect")
        getPlants()
    }, [])

    return (
        <>
        <Head>
            <title>Plants</title>
        </Head>
        <Header />
        <main>
            <section className="row justify-content-center">
                <PlantOverview plants={plants} />
            </section>
        </main>
        </>
    )

}

export default Plants;

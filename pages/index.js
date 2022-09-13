import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';


function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of highly active React meetups' 
                />
            </Head>
        <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

//tato funkce ma rezervovane jmeno, provede se jeste pred vyrenderovanim stranky na browseru, pote se provede po kazde zmene contextu
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {}
//     };
// }

//tato funkce ma rezervovane jmeno, provede se jeste pred vyrenderovanim stranky na browseru
export async function getStaticProps() {
    const client = await MongoClient.connect(
        'mongodb+srv://kykil:student@cluster0.oumkord.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db('meetupweb');

    const meetupsCollection = db.collection('meetups');

    const meetups= await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup=>({
                id:meetup._id.toString(),
                title:meetup.title,
                address:meetup.address,
                image:meetup.image
            }))
        },
        revalidate: 1 //tato property udava pocet sekund, po kterych se stranka znovu obnovi
    };
}

export default HomePage;
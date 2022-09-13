import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups | {props.meetupData.title}</title>
                <meta name="description" content={"Content from particular meetup. "+props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description} />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://kykil:student@cluster0.oumkord.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db('meetupweb');

    const meetupsCollection = db.collection('meetups');

    //funkce find najde vsechny prvky kolekce (vsechny zaznamy z tabulky)
    //muze se do jejich argumentu pridat filtr jako objekt, ktery udava pole (sloupce), ktere chci z kazdeho zaznamu ziskat
    //druhy argumet udava, ze chci sechny objekty, ktere maji id
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => (
            {
                params: {
                    meetupId: meetup._id.toString()
                }
            }
        ))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://kykil:student@cluster0.oumkord.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db('meetupweb');

    const meetupsCollection = db.collection('meetups');

    //mongo db uklada id ve forme nejakeho objektu, proto musim hledane id do toho objektu pretypovat
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(), //tady to pretypuju zpet na string
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;

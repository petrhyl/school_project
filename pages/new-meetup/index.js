import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const respose = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await respose.json();

        console.log(data);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>React Meetups | Add</title>
                <meta name='description' content='Add your awsome new meetup.'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}

export default NewMeetupPage;
import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="Find a great many events here to allow you to advance in your developer journey!"
        />
      </Head>
      <center>
        <NewsletterRegistration />
        <EventList items={props.events} />
      </center>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;

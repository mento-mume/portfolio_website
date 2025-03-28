import Hero from "../components/Hero/Hero";
import Projects from "../components/Projects/Projects";
import Technologies from "../components/Technologies/Technologies";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";

import { Layout } from "../layout/Layout";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Technologies />
      <Contact />
    </Layout>
  );
};

export default Home;

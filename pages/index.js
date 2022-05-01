import SmallCard from '../components/SmallCard';
import { projectIcons } from '../components/Icons';
import Link from 'next/link';

import { projects } from '../utils/projectsData';

const Home = () => (
  <div className="home">
    <h1>What Can I Deploy to Static Apps?</h1>
    <Link href="/factory"><a>Factory Example</a></Link>
    <div className="card-grid">
      {projects.map((project) => {
        const Icon = projectIcons[project.id];
        return (
          <SmallCard
            key={project.id}
            Icon={Icon}
            title={project.name}
            slug={project.slug}
          />
        );
      })}
    </div>
  </div>
);

export default Home;

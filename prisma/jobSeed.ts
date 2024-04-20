// prisma/jobSeed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedJobs() {
  await prisma.job.createMany({
    data: [
      {
        id: 1,
        company: 'Scoot',
        logo: '/logos/scoot.svg',
        logoBackground: 'hsl(36, 87%, 49%)',
        position: 'Senior Software Engineer',
        postedAt: '5h ago',
        contract: 'Full Time',
        location: 'United Kingdom',
        website: 'https://example.com/scoot',
        apply: 'https://example.com/scoot/apply',
        description: 'Scoot is looking for a Senior Software Engineer passionate about building approachable, innovative and user-first experiences to join our small but growing Engineering team. You will be responsible for building and maintaining front end functionality across all of Scoot’s applications, fostering a growing team of software engineers, and helping drive and maintain best software patterns and practices in our codebase.',
      },
      {
        id: 2,
        company: 'Blogr',
        logo: '/logos/blogr.svg',
        logoBackground: 'hsl(12, 79%, 52%)',
        position: 'Haskell and PureScript Dev',
        postedAt: '20h ago',
        contract: 'Part Time',
        location: 'United States',
        website: 'https://example.com/blogr',
        apply: 'https://example.com/blogr/apply',
        description: 'Blogr is looking for a part-time developer to join our six-strong team of full-stack engineers. Our core development values are strong, static typing and correctness, rigorous automation (in both testing and infrastructure) and everyone having a say.',
      },
      {
        id: 3,
        company: 'Vector',
        logo: '/logos/vector.svg',
        logoBackground: 'hsl(235, 10%, 23%)',
        position: 'Midlevel Back End Engineer',
        postedAt: '1d ago',
        contract: 'Part Time',
        location: 'Spain',
        website: 'https://example.com/vector',
        apply: 'https://example.com/vector/apply',
        description: 'Vector is seeking a Midlevel Back End Engineer to join our team. If you are passionate about backend development and enjoy working on challenging projects, we would love to hear from you!',
      },
    ],
  });

  console.log('Seeding finished.');
}

seedJobs()
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

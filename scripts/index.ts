import prisma from '@utils/prisma';

const main = async () => {
  console.log('Called');
  const races = await prisma.race.findMany({
    select: {
      name: true,
    },
  });

  console.log(races);
};

main();

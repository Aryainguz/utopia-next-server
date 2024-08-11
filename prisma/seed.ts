// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {


  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      password: 'hashedpassword2', // Replace with hashed passwords
      avatarUrl: 'https://example.com/avatar2.png',
      posts: {
        create: [
          {
            content: 'Admin here, managing the community!',
            likes:0,
            impressions:0
          },
        ],
      },
    },
  });

  // Create additional posts
  const post3 = await prisma.post.create({
    data: {
      content: 'Another post by John!',
      userId: user2.id,
      likes:0,
      impressions:0
    },
  });

  // Add liked posts
  await prisma.user.update({
    where: { id: user2.id },
    data: {
      likedPosts: {
        connect: { id: post3.id },
      },
    },
  });

  console.log({ user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

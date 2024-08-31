import { Genre, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genres = [
  { name: 'drama' },
  { name: 'fantasy' },
  { name: 'horror' },
  { name: 'action' },
  { name: 'romance' },
  { name: 'thriller' },
  { name: 'comedy' }
];

const movies = [
  {
    title: 'Inception',
    description:
      'A thief who enters the dreams of others to steal secrets is given a chance at redemption by planting an idea into the mind of a CEO.',
    releaseDate: '2010-07-16',
    genres: ['action', 'thriller', 'drama']
  },
  {
    title: 'The Dark Knight',
    description:
      "Batman must face his most formidable challenge yet, as the Joker seeks to dismantle Gotham's sense of justice.",
    releaseDate: '2008-07-18',
    genres: ['action', 'drama', 'thriller']
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    description:
      'A young hobbit and his allies embark on a perilous journey to destroy the One Ring and defeat the Dark Lord Sauron.',
    releaseDate: '2001-12-19',
    genres: ['fantasy', 'action', 'drama']
  },
  {
    title: 'The Matrix',
    description:
      'A hacker learns about the true nature of his reality and the role he must play in a war against its controllers.',
    releaseDate: '1999-03-31',
    genres: ['action', 'thriller']
  },
  {
    title: 'Titanic',
    description:
      'A wealthy woman falls in love with a poor artist on the ill-fated voyage of the RMS Titanic.',
    releaseDate: '1997-12-19',
    genres: ['drama', 'romance']
  },
  {
    title: 'The Shining',
    description:
      'A man descends into madness while isolated in a haunted hotel with his family during the winter.',
    releaseDate: '1980-05-23',
    genres: ['horror', 'drama']
  },
  {
    title: 'Avatar',
    description:
      'A paraplegic Marine on a mission to Pandora finds himself torn between following orders and protecting the world he grows to love.',
    releaseDate: '2009-12-18',
    genres: ['fantasy', 'action']
  },
  {
    title: 'The Godfather',
    description:
      'The patriarch of a powerful crime family hands over control to his youngest son, setting off a series of events that changes their world forever.',
    releaseDate: '1972-03-24',
    genres: ['drama']
  },
  {
    title: 'Pulp Fiction',
    description:
      'Multiple interconnected stories of crime and redemption unfold in a non-linear narrative.',
    releaseDate: '1994-10-14',
    genres: ['drama', 'comedy']
  },
  {
    title: 'The Exorcist',
    description:
      'A mother turns to two priests to save her daughter from a demonic possession.',
    releaseDate: '1973-12-26',
    genres: ['horror', 'thriller']
  },
  {
    title: 'Fight Club',
    description:
      'An insomniac office worker forms an underground fight club as a radical form of self-therapy.',
    releaseDate: '1999-10-15',
    genres: ['drama', 'thriller']
  },
  {
    title: 'Forrest Gump',
    description:
      'The extraordinary life story of a simple man with a low IQ but with good intentions.',
    releaseDate: '1994-07-06',
    genres: ['drama', 'comedy', 'romance']
  },
  {
    title: 'The Avengers',
    description:
      "Earth's mightiest heroes must band together to stop the mischievous Loki from taking over the world.",
    releaseDate: '2012-05-04',
    genres: ['action', 'fantasy']
  },
  {
    title: 'Star Wars: A New Hope',
    description:
      'A young farm boy embarks on an adventure across the galaxy to save a princess and restore hope to the galaxy.',
    releaseDate: '1977-05-25',
    genres: ['fantasy', 'action']
  },
  {
    title: 'Jaws',
    description:
      'A police chief, a marine scientist, and a grizzled fisherman set out to stop a killer great white shark.',
    releaseDate: '1975-06-20',
    genres: ['thriller', 'horror']
  },
  {
    title: 'Interstellar',
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: '2014-11-07',
    genres: ['fantasy', 'drama']
  },
  {
    title: 'The Silence of the Lambs',
    description:
      'A young FBI cadet seeks the help of an incarcerated cannibalistic serial killer to catch another serial killer.',
    releaseDate: '1991-02-14',
    genres: ['thriller', 'horror', 'drama']
  },
  {
    title: 'Gladiator',
    description:
      'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.',
    releaseDate: '2000-05-05',
    genres: ['drama', 'action']
  },
  {
    title: 'The Lion King',
    description:
      'A young lion prince is cast out of his pride by his cruel uncle, only to return years later to claim his throne.',
    releaseDate: '1994-06-24',
    genres: ['drama', 'fantasy']
  },
  {
    title: 'Back to the Future',
    description:
      'A teenager is accidentally sent 30 years into the past in a time-traveling DeLorean and must fix the timeline.',
    releaseDate: '1985-07-03',
    genres: ['comedy', 'fantasy', 'action']
  }
];

async function main() {
  await prisma.genre.createMany({
    data: genres
  });

  for (let i: number = 0; i < movies.length; i++) {
    const movie = movies[i];
    const { genres, ...movieModel } = movie;
    const dbGenres: Genre[] = await prisma.genre.findMany({
      where: { name: { in: movie.genres } }
    });
    const genreIds = dbGenres.map((item) => {
      return { genreId: item.id };
    });
    await prisma.movie.create({
      data: {
        ...movieModel,
        releaseDate: new Date(movieModel.releaseDate),
        moviesToGenres: {
          createMany: {
            data: genreIds
          }
        }
      }
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

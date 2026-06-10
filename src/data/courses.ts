import { Course } from '../types/course';

export const courses: Course[] = [
  {
    title: 'Advanced Web Development',
    instructor: 'Sarah Johnson',
    duration: '12 weeks',
    students: 1234,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    price: '$99.99',
    category: 'Web Development'
  },
  {
    title: 'Data Science Fundamentals',
    instructor: 'Michael Chen',
    duration: '8 weeks',
    students: 856,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    price: '$89.99',
    category: 'Data Science'
  },
  {
    title: 'UI/UX Design Masterclass',
    instructor: 'Emma Davis',
    duration: '10 weeks',
    students: 2156,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    price: '$79.99',
    category: 'UI/UX Design'
  },
  {
    title: 'Mobile App Development',
    instructor: 'David Wilson',
    duration: '10 weeks',
    students: 1567,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
    price: '$94.99',
    category: 'Mobile Development'
  },
  {
    title: 'Machine Learning Basics',
    instructor: 'Lisa Anderson',
    duration: '8 weeks',
    students: 987,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    price: '$89.99',
    category: 'Machine Learning'
  },
  {
    title: 'Digital Marketing Strategy',
    instructor: 'Chris Martinez',
    duration: '6 weeks',
    students: 2345,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    price: '$69.99',
    category: 'Digital Marketing'
  }
];

export const featuredCourses = courses.slice(0, 3);
import { Photo } from '../types/Photo';

export const mockPhotos: Photo[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        title: 'The Happy Couple',
        uploaderName: 'Sarah Johnson',
        uploadDate: new Date('2024-01-15T10:30:00'),
        fileName: 'couple-portrait.jpg'
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        title: 'First Dance',
        uploaderName: 'Mike Thompson',
        uploadDate: new Date('2024-01-15T14:45:00'),
        fileName: 'first-dance.jpg'
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        title: 'Wedding Cake',
        uploaderName: 'Emma Davis',
        uploadDate: new Date('2024-01-15T16:20:00'),
        fileName: 'wedding-cake.jpg'
    },
    {
        id: '5',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop',
        title: 'Wedding Rings',
        uploaderName: 'John Smith',
        uploadDate: new Date('2024-01-15T09:00:00'),
        fileName: 'rings.jpg'
    }
]; 
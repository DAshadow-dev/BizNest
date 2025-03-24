import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
}

const mockReviews: Review[] = [
    { id: '1', user: 'John Doe', rating: 5, comment: 'Great app! Highly recommend.' },
    { id: '2', user: 'Jane Smith', rating: 4, comment: 'Very useful, but could use some improvements.' },
    { id: '3', user: 'Alice Johnson', rating: 3, comment: 'It’s okay, but I’ve seen better.' },
];

const ReviewsScreen: React.FC = () => {
    const renderReview = ({ item }: { item: Review }) => (
        <View style={styles.reviewContainer}>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.rating}>Rating: {item.rating}/5</Text>
            <Text style={styles.comment}>{item.comment}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Reviews</Text>
            <FlatList
                data={mockReviews}
                keyExtractor={(item) => item.id}
                renderItem={renderReview}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 16,
    },
    reviewContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    comment: {
        fontSize: 14,
        color: '#333',
    },
});

export default ReviewsScreen;
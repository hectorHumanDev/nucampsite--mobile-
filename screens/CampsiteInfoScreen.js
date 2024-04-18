import RenderCampsite from "../features/campsites/RenderCampsite";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { toggleFavorite } from "../features/favorites/FavoritesSlice";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;

  const comments = useSelector((state) => state.comments);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch;

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating}</Text>
        <Text style={{ fontSize: 12 }}>{`--${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={comments.commentsArray.filter(
        (comment) => comment.campsiteId === campsite.id
      )}
      renderItem={renderCommentItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
      ListHeaderComponent={
        <>
          <RenderCampsite
            campsite={campsite}
            isFavorite={favorites.includes(campsite.id)}
            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
          />
          <Text style={styles.commentTitle}>Comment</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  commentTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export default CampsiteInfoScreen;

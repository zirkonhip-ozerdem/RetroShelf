import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useShelf} from '../../../shared/state/shelfStore';
import Card from '../../../shared/components/Card';
import {colors} from '../../../shared/theme/colors';

export default function ShelfScreen() {
  const {items} = useShelf();

  return (
    <View style={styles.wrap}>
      <Text style={styles.header}>Rafım</Text>
      <FlatList
  data={items}
  keyExtractor={(it) => it.id}
  renderItem={({item}) => (
    <Card item={item} />
  )}
  ListEmptyComponent={
    <Text style={styles.empty}>Henüz rafına eklediğin bir şey yok 🪄</Text>
  }
/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {flex: 1, backgroundColor: colors.bg, padding: 16},
  header: {color: colors.text, fontSize: 22, marginBottom: 12,paddingTop: 32},
  empty: {color: colors.muted, textAlign: 'center', marginTop: 24},
});

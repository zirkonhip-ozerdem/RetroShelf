import React from 'react';
import {
  Pressable,
  Image,
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {colors} from '../theme/colors';
import {useShelf} from '../state/shelfStore';
import {CatalogItem} from '../../features/catalog/types';

type Props = {
  item: CatalogItem;
  onPress?: () => void;
};



 export default function Card({item, onPress}: Props) {
  const {add, remove, items} = useShelf();

  // Bu item zaten rafımda mı?
  const isInShelf = items.some(i => i.id === item.id);

  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <Image
        source={{
          uri:
            item.coverUrl ??
            'https://placehold.co/120x160/png?text=RetroShelf',
        }}
        style={styles.cover}
      />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        {item.authorOrDirector ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.authorOrDirector} • {item.year}
          </Text>
        ) : null}

        {isInShelf ? (
          <Button title="➖ Rafımdan çıkar" onPress={() => remove(item.id)} />
        ) : (
          <Button title="➕ Rafıma ekle" onPress={() => add(item)} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  cover: {width: 60, height: 80, borderRadius: 8, backgroundColor: '#222'},
  meta: {flex: 1, justifyContent: 'center', gap: 6},
  title: {color: colors.text, fontSize: 16, fontWeight: '600'},
  subtitle: {color: colors.muted, fontSize: 12},
});

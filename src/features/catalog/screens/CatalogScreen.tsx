import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {SEED_ITEMS} from '../seed';
import {CatalogItem} from '../types';
import Card from '../../../shared/components/Card';
import {colors} from '../../../shared/theme/colors';

type Props = {
  initialType: 'movie' | 'book';
  title: string; // üst başlık (Movies / Books)
};

export default function CatalogScreen({initialType, title}: Props) {
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const base = SEED_ITEMS.filter(i => i.type === initialType);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter(
      i =>
        i.title.toLowerCase().includes(q) ||
        (i.authorOrDirector ?? '').toLowerCase().includes(q),
    );
  }, [initialType, query]);

  const renderItem = ({item}: {item: CatalogItem}) => (
    <Card
      title={item.title}
      subtitle={[item.authorOrDirector, item.year].filter(Boolean).join(' • ')}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <Text style={styles.header}>{title}</Text>

        <View style={styles.searchWrap}>
          <TextInput
            placeholder="Ara: başlık / yazar / yönetmen"
            placeholderTextColor={colors.muted}
            value={query}
            onChangeText={setQuery}
            style={styles.search}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(it) => it.id}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          contentContainerStyle={{paddingBottom: 24}}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>Hiç sonuç yok. Aramayı değiştir.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.bg},
  screen: {flex: 1, padding: 16, gap: 12},
  header: {color: colors.text, fontSize: 22, fontWeight: '700'},
  searchWrap: {borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.card},
  search: {color: colors.text, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14},
  empty: {color: colors.muted, textAlign: 'center', marginTop: 24},
});

import React from 'react';
import {Pressable, Image, View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';

type Props = {
  title: string;
  subtitle?: string;
  coverUrl?: string;
  onPress?: () => void;
};

export default function Card({title, subtitle, coverUrl, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <Image
        source={{
          uri:
            coverUrl ??
            'https://placehold.co/120x160/png?text=RetroShelf',
        }}
        style={styles.cover}
      />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text> : null}
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
  },
  cover: {width: 60, height: 80, borderRadius: 8, backgroundColor: '#222'},
  meta: {flex: 1, justifyContent: 'center'},
  title: {color: colors.text, fontSize: 16, fontWeight: '600'},
  subtitle: {color: colors.muted, fontSize: 12, marginTop: 4},
});

import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import api from '../../service/api';

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';

import { Heading, Background, DuoMatch, DuoCard, DuoCardProps } from '../../components';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const router = useRoute();
  const game = router.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
		api.get(`/ads/${adsId}/discord`)
      .then(({ data }) => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
		api.get(`/games/${game.id}/ad`)
      .then(({ data }) => setDuos(data))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={24}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
          showsHorizontalScrollIndicator
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          }
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}

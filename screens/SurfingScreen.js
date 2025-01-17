import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
// Firestore from firebase
import firestore from '@react-native-firebase/firestore';
import colors from '../constants/Colors';
import Lightbox from 'react-native-lightbox';
import styles from './Styles/SurfingScreenStyle';
import AppText from '../components/AppText';

const Surfing = (props) => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('posts')
      .onSnapshot((querySnapshot) => {
        const posts = [];
        // querySnapshot.forEach((documentSnapshot) => {
        //   posts.push({
        //     ...documentSnapshot.data(),
        //     key: documentSnapshot.id,
        //   });
        // });
        setPostList(posts);
      });
    return () => subscriber();
  }, []);

  const handleFollow = (index) => {
    const followPost = [...postList];
    followPost[index].isSelected = !followPost[index].isSelected;
    setPostList(followPost);
  };

  return (
    <ScrollView>
      <View style={styles.headerbar}>
        <Text style={{ color: colors.white, fontSize: 15, fontWeight: 'bold' }}>
          <AppText i18nKey={'surfing'} />
        </Text>
      </View>
      <View style={styles.tabView}>
        <View>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.titleTab}>
              <AppText i18nKey={'explore'} />
            </Text>
            <Text style={styles.titleTabBot}>
              <AppText i18nKey={'newInformation'} />
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.titleTab}>
              <AppText i18nKey={'care'} />
            </Text>
            <Text style={styles.titleTabBot}>
              <AppText i18nKey={'follow'} />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.titleTab}>TikiLIVE</Text>
            <Text style={styles.titleTabBot}>
              <AppText i18nKey={'liveEverytime'} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.blogNew}>
        {(() => {
          return postList.map((item, index) => {
            return (
              <View style={styles.singlePost}>
                <View style={styles.headPost}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 50,
                          marginRight: 10,
                        }}
                        source={{
                          uri: item.avatar,
                        }}
                      />
                    </View>
                    <View>
                      <Text>{item.title}</Text>
                      <Text>
                        <AppText i18nKey={'store'} /> - 12{' '}
                        <AppText i18nKey={'minuteAgo'} />
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        handleFollow(index);
                      }}
                      activeOpacity={0.8}>
                      {item.isSelected ? (
                        <>
                          <Text style={styles.follow}>
                            <AppText i18nKey={'follow'} />
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text style={styles.followed}>
                            <AppText i18nKey={'followed'} />
                          </Text>
                        </>
                      )}
                      {/* <Text style={styles.follow}>Theo dõi</Text> */}
                    </TouchableOpacity>
                  </View>
                </View>

                <Lightbox backgroundColor="#00000085" underlayColor="white">
                  <Image
                    resizeMode="stretch"
                    style={styles.imagePost}
                    source={{
                      uri: item.url,
                    }}
                  />
                </Lightbox>
              </View>
            );
          });
        })()}
      </View>
    </ScrollView>
  );
};

export default Surfing;

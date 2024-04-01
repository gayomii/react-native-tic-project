import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import { CommentType, FeedType } from '../types/types';
import { setAgoDays } from '../utils/setAgoDays';

const { width, height } = Dimensions.get('window');

const CommentsModal = ({
  item,
  showModal,
  setShowModal,
  leaveComment,
}: {
  item: FeedType;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  leaveComment: (comment: string) => {};
}) => {
  const [commentValue, setCommentValue] = useState('');
  const RenderComment = ({ item }: { item: CommentType }) => {
    return (
      <View style={styles.commentWrapper}>
        <View style={styles.commentUser}>
          <View style={styles.userProfile}>
            <Image
              source={{ uri: 'https://avatar.iran.liara.run/public' }}
              style={styles.profileImg}
            />
            <View>
              <Text style={styles.userText}>{item.userName}</Text>
              <Text style={styles.timeText}>{setAgoDays(item.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="ellipsis1" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.comment}>
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      useNativeDriver
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={200}
      animationOutTiming={300}
      isVisible={showModal}
      backdropOpacity={0.6}
      onBackdropPress={() => {
        Keyboard.dismiss();
        setShowModal(!showModal);
      }}
      onBackButtonPress={() => {
        Keyboard.dismiss();
        setShowModal(!showModal);
      }}
      style={styles.modalWrapper}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.modalBox}>
          <View style={styles.modalHeader}>
            <Text>댓글</Text>
            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalMain}>
            <FlatList data={item.comments} renderItem={RenderComment} />
          </View>
          <View style={styles.commentInputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                maxLength={200}
                placeholder="댓글을 입력해주세요."
                placeholderTextColor="#bbb"
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                value={commentValue}
                onChangeText={text => setCommentValue(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.commentButton}
              onPress={() => {
                leaveComment(commentValue);
              }}>
              <Text style={styles.commentButtonText}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBox: {
    width,
    backgroundColor: '#fff',
    paddingTop: 10,
    height: height / 1.5,
    paddingHorizontal: 16,
  },
  modalHeader: {
    minHeight: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 16,
  },
  modalMain: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commentWrapper: {
    gap: 8,
    paddingBottom: 24,
  },
  commentUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userProfile: {
    flexDirection: 'row',
    gap: 4,
  },
  profileImg: {
    width: 24,
    height: 24,
  },
  userText: {
    fontSize: 12,
    color: '#333',
  },
  timeText: {
    color: '#BBBBBB',
    fontSize: 10,
  },
  comment: {},
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  commentInputWrapper: {
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 24,
    minHeight: 40,
    maxHeight: 130,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
  },
  textInput: {
    minHeight: 24,
    maxHeight: 80,
    paddingVertical: 0,
    lineHeight: 18,
    fontSize: 16,
    color: '#3a3a3a',
  },
  commentButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#C3C3C3',
  },
});

export default CommentsModal;

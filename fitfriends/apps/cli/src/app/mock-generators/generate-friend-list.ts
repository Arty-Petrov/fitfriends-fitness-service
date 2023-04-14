import { UserFriendsDto } from '@fitfriends/contracts';

export const generateFriendList = (
  userId: string,
  friendIds: string[]
): UserFriendsDto => ({
    userId: userId,
    friendIds: friendIds.filter((friendsId) => friendsId !== userId),
})

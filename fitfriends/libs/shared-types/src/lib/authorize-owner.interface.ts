export interface AuthorizeOwner {
  isOwner(currentUserId: string, objectId: string | number): Promise<boolean>
}

export interface Comment {
  id: string;
  author: string;
  commenterEmail: string;
  commenterObjectId?: string;
  avatar: string;
  avatarColor: string;
  text: string;
  date: string; // ISO datetime
}

export interface Collaborator {
  id: string; // email-based identifier
  name: string;
  objectId?: string;
  avatar: string;
  avatarColor: string;
  role: 'Owner' | 'Contributor' | 'Reviewer';
  email: string;
  joinedDate: string; // ISO datetime
}

export interface CollaborationRequest {
  id: string; // email-based identifier
  requesterId: string; // requester email
  requesterObjectId?: string;
  requesterName: string;
  requesterAvatar: string;
  requesterAvatarColor: string;
  message: string;
  date: string; // ISO datetime
  status: 'pending' | 'accepted' | 'declined';
  decidedBy?: string;
  decidedByObjectId?: string;
  decidedAt?: string;
  decisionReason?: string;
}

export interface CollaborationNote {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  text: string;
  date: string; // ISO datetime
  pinned: boolean;
}

export interface IdeaAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  uploadedBy: string;
  uploadedByEmail?: string;
  uploadedByObjectId?: string;
  uploadedDate: string; // ISO datetime
}

export interface AuditInfo {
  createdBy: string; // email
  createdByObjectId?: string;
  createdDate: string; // ISO datetime
  updatedBy: string; // email
  updatedByObjectId?: string;
  updatedDate: string; // ISO datetime
  history: AuditEvent[];
}

export interface AuditEvent {
  action: string;
  changedBy: string;
  changedByObjectId?: string;
  changedAt: string;
  changedFields?: string[];
  note?: string;
}

export interface IdeaInformation {
  title: string;
  description: string;
  tags: string[];
  status: 'published' | 'draft';
  coverImage?: string;
  coverPosition?: string;
}

export interface AuthorInformation {
  name: string;
  email: string;
  objectId?: string;
  avatar: string;
  avatarColor: string;
}

export interface CollaboratorInformation {
  members: Collaborator[];
}

export interface ShareEvent {
  sharedBy: string;
  sharedByObjectId?: string;
  sharedAt: string;
}

export interface EngagementInfo {
  likes: number;
  shares: number;
  likedBy: string[];
  favoritedBy: string[];
  sharedBy: ShareEvent[];
}

export interface ContentInfo {
  attachments: IdeaAttachment[];
  comments: Comment[];
  collaborationNotes: CollaborationNote[];
  collaborationRequests: CollaborationRequest[];
}

export interface Idea {
  id: string;
  ideaInformation: IdeaInformation;
  authorInformation: AuthorInformation;
  collaboratorInformation: CollaboratorInformation;
  engagement: EngagementInfo;
  content: ContentInfo;
  audit: AuditInfo;
}

export interface AzureUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  avatar: string;
  avatarColor: string;
  tenantId?: string;
  accessToken?: string;
}

export interface AppNotification {
  id: string;
  type: 'collab_request' | 'collab_accepted' | 'collab_declined' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  ideaId?: string;
  ideaTitle?: string;
  fromUser?: string;
  fromAvatar?: string;
  fromAvatarColor?: string;
}

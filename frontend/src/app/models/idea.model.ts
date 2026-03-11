export interface Comment {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  text: string;
  date: string;
}

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  role: 'Owner' | 'Contributor' | 'Reviewer';
  email: string;
  joinedDate: string;
}

export interface CollaborationRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  requesterAvatarColor: string;
  message: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface CollaborationNote {
  id: string;
  author: string;
  avatar: string;
  avatarColor: string;
  text: string;
  date: string;
  pinned: boolean;
}

export interface IdeaAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  uploadedBy: string;
  uploadedDate: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  avatar: string;
  avatarColor: string;
  date: string;
  tags: string[];
  attachments: IdeaAttachment[];
  likes: number;
  shares: number;
  comments: Comment[];
  collaborators: Collaborator[];
  collaborationNotes: CollaborationNote[];
  collaborationRequests: CollaborationRequest[];
}

export interface AzureUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarColor: string;
  tenantId?: string;
  accessToken?: string;
}

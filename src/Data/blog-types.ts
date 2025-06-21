
export type Blog = {
    _id: string;
    title: string;
    description: string;
    image: string;
    category?: string[];
    tags?: string[];
    like: string[];
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  
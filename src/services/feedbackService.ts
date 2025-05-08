
import { supabase } from "@/integrations/supabase/client";

// Define types for the service
export interface FeedbackSubmission {
  customer_name?: string;
  email?: string;
  location?: string;
  date_of_visit?: Date;
  product_id: string;
  product_variant_id?: string;
  staff_friendliness?: number;
  cleanliness?: number;
  product_availability?: number;
  overall_experience?: number;
  selected_issue_id?: string;
  comments?: string;
  is_anonymous: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  description?: string;
}

export interface Issue {
  id: string;
  name: string;
  description?: string;
}

export interface FeedbackResponse {
  id: string;
  submitted: boolean;
  timestamp: string;
  message: string;
}

/**
 * Service for feedback-related API operations using Supabase
 */
export const FeedbackService = {
  /**
   * Submit feedback to Supabase
   */
  submitFeedback: async (data: FeedbackSubmission): Promise<FeedbackResponse> => {
    try {
      const { data: feedbackData, error } = await supabase
        .from('feedback')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error("Error submitting feedback:", error);
        throw new Error(error.message);
      }

      return {
        id: feedbackData.id,
        submitted: true,
        timestamp: feedbackData.created_at,
        message: "Feedback submitted successfully"
      };
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      return {
        id: "",
        submitted: false,
        timestamp: new Date().toISOString(),
        message: error.message || "Failed to submit feedback"
      };
    }
  },

  /**
   * Get available products from Supabase
   */
  getProducts: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) {
        console.error("Error fetching products:", error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  /**
   * Get product variants by product ID
   */
  getProductVariants: async (productId: string): Promise<ProductVariant[]> => {
    try {
      const { data, error } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .order('name');

      if (error) {
        console.error("Error fetching product variants:", error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching product variants:", error);
      return [];
    }
  },

  /**
   * Get available issues
   */
  getIssues: async (): Promise<Issue[]> => {
    try {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('name');

      if (error) {
        console.error("Error fetching issues:", error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error("Error fetching issues:", error);
      return [];
    }
  }
};

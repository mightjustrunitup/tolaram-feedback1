
import { get, post } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";

// Define types for the service
export interface FeedbackSubmission {
  customerName?: string;
  location?: string;
  productId: string;
  variantId: string;
  issues: string[];
  comments?: string;
}

export interface FeedbackResponse {
  id: string;
  submitted: boolean;
  timestamp: string;
  message: string;
}

/**
 * Service for feedback-related API operations
 */
export const FeedbackService = {
  /**
   * Submit feedback to Supabase
   */
  submitFeedback: async (data: FeedbackSubmission): Promise<FeedbackResponse> => {
    try {
      const { data: insertedData, error } = await supabase
        .from('feedback')
        .insert({
          customer_name: data.customerName,
          location: data.location,
          product_id: data.productId,
          variant_id: data.variantId,
          issues: data.issues,
          comments: data.comments
        })
        .select('id, created_at')
        .single();
      
      if (error) throw error;
      
      return {
        id: insertedData.id,
        submitted: true,
        timestamp: insertedData.created_at,
        message: "Feedback submitted successfully"
      };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return {
        id: '',
        submitted: false,
        timestamp: new Date().toISOString(),
        message: "Failed to submit feedback"
      };
    }
  },

  /**
   * Get available products from the backend
   */
  getProducts: () => {
    return get<any[]>('/products');
  },

  /**
   * Get product variants by product ID
   */
  getProductVariants: (productId: string) => {
    return get<any[]>(`/products/${productId}/variants`);
  }
};

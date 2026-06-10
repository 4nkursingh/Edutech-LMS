import { supabase } from './supabase';

export async function enrollInCourse(courseTitle: string) {
  try {
    const { data: { user }, error: authError } = await supabase!.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase!
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseTitle,
        current_module: 'Introduction',
        progress: 0,
        completed: false
      })
      .select()
      .single();

    if (error) {
      // Handle duplicate enrollment gracefully
      if (error.code === '23505') {
        return { alreadyEnrolled: true };
      }
      throw error;
    }

    return { success: true, enrollment: data };
  } catch (error) {
    console.error('Error in enrollInCourse:', error);
    throw error;
  }
}

export async function addToWishlist(courseTitle: string) {
  try {
    const { data: { user }, error: authError } = await supabase!.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase!
      .from('wishlists')
      .insert({
        user_id: user.id,
        course_id: courseTitle
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return { alreadyInWishlist: true };
      }
      throw error;
    }

    return { success: true, wishlist: data };
  } catch (error) {
    console.error('Error in addToWishlist:', error);
    throw error;
  }
}

export async function removeFromWishlist(courseTitle: string) {
  try {
    const { data: { user }, error: authError } = await supabase!.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase!
      .from('wishlists')
      .delete()
      .match({ user_id: user.id, course_id: courseTitle });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    throw error;
  }
}

export async function getUserEnrollments() {
  try {
    const { data: { user }, error: authError } = await supabase!.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase!
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error in getUserEnrollments:', error);
    throw error;
  }
}

export async function getUserWishlist() {
  try {
    const { data: { user }, error: authError } = await supabase!.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase!
      .from('wishlists')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error in getUserWishlist:', error);
    throw error;
  }
}

export async function updateCourseProgress(courseTitle: string, progress: number, currentModule: string) {
  try {
    const { data: { user }, error: authError } = await supabase!.auth.getUser();
    if (authError) throw authError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase!
      .from('enrollments')
      .update({
        progress,
        current_module: currentModule,
        last_accessed: new Date().toISOString(),
        completed: progress === 100
      })
      .match({ user_id: user.id, course_id: courseTitle })
      .select()
      .single();

    if (error) throw error;
    return { success: true, enrollment: data };
  } catch (error) {
    console.error('Error in updateCourseProgress:', error);
    throw error;
  }
}
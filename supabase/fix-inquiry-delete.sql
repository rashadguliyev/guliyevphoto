-- Run this once in Supabase Dashboard > SQL Editor.
-- It repairs the admin delete permission for contact inquiries.

drop policy if exists "Admins delete inquiries" on public.contact_messages;

create policy "Admins delete inquiries"
on public.contact_messages
for delete
to authenticated
using (public.is_site_admin());

grant delete on public.contact_messages to authenticated;

notify pgrst, 'reload schema';

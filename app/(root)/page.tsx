// Importing the currentUser function from the "@clerk/nextjs" package
import { currentUser } from "@clerk/nextjs";

// Importing the redirect function from the "next/navigation" package
import { redirect } from "next/navigation";

// Importing components for the Home page
import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

// Importing action functions from the action files
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";

// Defining the Home function component, which takes searchParams as a prop
async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Retrieving the current user using the currentUser function
  const user = await currentUser();

  // If no user is found, return null (abort rendering)
  if (!user) return null;

  // Fetching user information based on the user's ID
  const userInfo = await fetchUser(user.id);

  // If the user is not onboarded, redirect to the onboarding page
  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetching posts based on the page number and a fixed limit (30 posts per page)
  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  // Rendering the Home component
  return (
    <>
      {/* Heading for the Home page */}
      <h1 className='head-text text-left'>Home</h1>

      {/* Section for displaying thread cards */}
      <section className='mt-9 flex flex-col gap-10'>
        {/* Conditional rendering based on the number of posts */}
        {result.posts.length === 0 ? (
          // Display a message if no posts are found
          <p className='no-result'>No Gists found</p>
        ) : (
          // Displaying ThreadCard components for each post
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      {/* Pagination component for navigating between pages */}
      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

// Exporting the Home component as the default export
export default Home;

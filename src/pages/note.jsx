const Note = () => {
  return (
    <main>
      <div className="container">
        <div className="grid">
          <header className="intro">
            <h1>Notes</h1>
            <div className="intro-description">
              <p>Stay hungry, stay foolish.</p>
            </div>
            <button className="button small">View All Tags</button>
          </header>
        </div>
        <h1>Under construction</h1>
        <div>
          <p>
            I aim to distinguish between notes and blogs. According to my
            design, notes will be categorized and organized like a book. This
            will include sections for studying new tech stacks, summarizing
            insights from books, and learning about various tools. There are
            several things to do:
          </p>
          <ol>
            <li>
              database design
              <ul>
                <li>
                  still using retional db? or change to mongodb? or store notes
                  as blob.
                </li>
                <li>
                  should tags be applied to both blogs and notes? I inclined to
                  yes.
                </li>
                <li>
                  users, or say, viewers will definetly need to comment on
                  blogs, will they allowed to comment on notes?
                </li>
              </ul>
            </li>
            <li>
              frontend design
              <ul>
                <li>a sidebar to show all pages in current categories</li>
                <li>maybe consider using mdbook?</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
};

export default Note;

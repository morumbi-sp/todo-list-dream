function App() {
  return (
    <div>
      {/* Nav Bar */}
      <div>
        <div>
          <button>D/L</button>
        </div>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>

      {/* Main */}
      <div>
        {['Study React', 'Work out', 'visit park', 'eat stake'].map(
          (item, idx) => (
            <div key={idx}>
              <div>
                <input type='checkbox' />
                <span>{item}</span>
              </div>
              <button>Delete</button>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <form>
        <input type='text' />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;

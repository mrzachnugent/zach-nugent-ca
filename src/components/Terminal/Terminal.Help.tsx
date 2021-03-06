export const TerminalHelp = () => {
  return (
    <div className='w-full'>
      <pre data-prefix='>' className=' whitespace-pre-wrap pb-2'>
        <code>🙋 HELP</code>
      </pre>
      <div className='overflow-x-auto ml-4 mr-2 rounded-lg border-base-200 border my-4'>
        <table className='table w-full table-zebra'>
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            <tr>
              <th>1</th>
              <td>
                <code>contact</code>
              </td>
              <td>Get my contact info</td>
            </tr>
            {/* <!-- row 2 --> */}
            <tr>
              <th>2</th>
              <td>
                <code>quit</code>
              </td>
              <td>Quit terminal</td>
            </tr>
            {/* <!-- row 3 --> */}
            <tr>
              <th>3</th>
              <td>
                <code>init</code>
              </td>
              <td>Reinitialize terminal</td>
            </tr>
            {/* <!-- row 4 --> */}
            <tr>
              <th>4</th>
              <td>
                <code>clear</code>
              </td>
              <td>Clear terminal</td>
            </tr>
            {/* <!-- row 5 --> */}
            <tr>
              <th>5</th>
              <td>
                <code>nav --help</code>
              </td>
              <td>Show navigation commands</td>
            </tr>
            {/* <!-- row 5 --> */}
            <tr>
              <th>5</th>
              <td>
                <code>bot --help</code>
              </td>
              <td>See additional bot commands</td>
            </tr>
            {/* <!-- row 6 --> */}
            <tr>
              <th>6</th>
              <td>Anything else</td>
              <td>Chat with the bot</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 quit
clear
init
c
nav --help
            
 */

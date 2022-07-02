export const TerminalBotHelp = () => {
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
                <code>sing</code>
              </td>
              <td>I'll sing you a song</td>
            </tr>
            {/* <!-- row 2 --> */}
            <tr>
              <th>2</th>
              <td>
                <code>joke</code>
              </td>
              <td>I'll tell you a joke</td>
            </tr>
            {/* <!-- row 3 --> */}
            <tr>
              <th>3</th>
              <td>
                <code>c</code>
              </td>
              <td>Get my contact info</td>
            </tr>
            {/* <!-- row 4 --> */}
            <tr>
              <th>4</th>
              <td>
                <code>q</code>
              </td>
              <td>Quit terminal</td>
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

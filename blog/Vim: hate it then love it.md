So I’ve been using vim every day for about 6 months now. You shouldn’t try it, you won’t like it. Just use it for as long as it takes you look down upon other editors.

![vim](blog/images/vim.png)

Starting to use vim is easy with vimtutor (which is simply a clever text file that you learn to manipulate with vim) which is great, but I don’t think anywhere really makes the genuinely useful functionality stand out. So here are a few tips:

*   Use tabs. **:tabf** followed by a file name will open a file in a new tab — with tab completion. **:tabnew** is self explanatory. **gt** selects the next tab, **gT **the previous
*   Use Buffers. This allows you to split a window to view another part of the file for reference. **CTRL+w w** followed by **s** splits horizontally, **v** vertically. **q** will close the window. To open a new file in a buffer, **:sp**. You may switch windows with **CTRL+w w. **:vsp** opens a split buffer vertically.
*   **CTRL+a** and **CTRL+x** increment and decrement a (decimal) number under the cursor. Precede it with a number to repeat the operation
*   Use **–VISUAL BLOCK–** mode (**CTRL+v**) combined with **I** to prepend something to several lines at once. It will take effect when you go back to normal mode. You can also search and replace in the block in any visual mode!
*   **cc** blanks the line and puts you into insert mode
*   **O** and **o** creates a newline above and below the current line respectively
*   **ddp** swaps the current line with the next
*   **ci** followed by a delimiter will change text within that delimiter. For example, **ci"** will change **beans** in **"beans"**
*   **cw** will change the current word
*   **vim -p** will open a set of files in tabs. **-o** will open in a split buffer, and **-O** will do the same, but vertically
*   When on the command line, **Ctrl+f** will allow you to edit the command line vi-style. **Ctrl+C** will exit this mode.
*   **Ctrl+[** may be better than **ESC** as you don’t have the leave the home keys
*   add **set -o vi** to your bashrc for (default insert-mode) readline editing!
*   **J** will join the next line on the end of the current line
*   **vi{** to visual mode select in {} parenthesis. Then **zf** to fold that section.

Customise vim. Remove the annoying things, add cool features such as the [solarized][2] colour scheme; a very well-engineered palette for anything you stare at. [Pathogen][3] is worth installing to make managing plugins easier.

I made a vimrc, and eventually got carried away and made a [git repo][4] with configuration files for bash, tmux and git. It’s worth a look and is mostly commented. Fork it if you like.

 [2]: http://ethanschoonover.com/solarized
 [3]: https://github.com/tpope/vim-pathogen/
 [4]: https://github.com/naggie/dotfiles

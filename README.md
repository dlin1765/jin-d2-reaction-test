# <p align = 'center'> Jin d2 reaction test </p>

<p align = 'center'>
   A reaction time test website that tests your ability to react specifically to one move in Tekken 8
</p>
<p align = 'center'>
   Built in React and hosted with AWS Amplify
</p>
<p align = 'center'>
  <a href = 'https://down2react.com' target = "_blank" rel='noopener' align = 'center'>
     Link to website
  </a>
</p>
<div align = 'center'>
  <img src = 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' alt = 'React'/>
  <img src = 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white' alt = 'HTML5'/>
  <img src = 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white' alt = 'CSS'/>
  <img src = 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' alt = 'Javascript'/>
  <img src = 'https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white' alt = 'Styled Components'/>
  <img src = 'https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white' alt = 'Vite'/>
  <img src = 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white' alt = 'AWS'/>
</div>

# Video Demo
https://github.com/user-attachments/assets/d04a9db2-0b12-432b-a1a0-23f9582eb255

# How I made it

I chose React to build this project since I wanted to gain more experience building a more complicated app in it and to take advantage of a few packages. 

# Issues I ran into 

<div> 
  One of the first issues I ran into was how I was going to handle simulating the game on the web. The solution I landed on was to play a video with the move in it and start a timer when the move occured. If the user clicked the video before the move would hypothetically hit you in game (22 frames or 366.667 milliseconds) it would register as a successful block.
  
Initially, I wanted to have two seperate videos playing side by side, the left side being the player, and the right side being the opponent. I was going to swap the left side video for a video of the player blocking when the user clicked the video again, but I would run into issues where replacing video elements would not keep their state, and take some time to load. 
</div>


<div>
  I ended up deciding to use the current time of the video as a timer, since setInterval and setTimeout were pretty inaccurate in my testing. After recording my gameplay videos, I would note the exact frame the move would start up, and if the user clicked the video between that exact frame and 366.667 milliseconds later, it would register it as a successful block. 
</div>

# What I learned

As one of my first larger scale web dev projects, this project taught me a lot about managing my projects directory, controlling state in React, and building layouts in HTML and CSS that don't look terrible. I can't wait to dive into more complicated projects where I get to hone my skills even more!


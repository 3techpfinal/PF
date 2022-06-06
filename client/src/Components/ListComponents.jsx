import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export default function AlignItemsList({img,title,price}) {
  return (

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">

          <CardMedia
          component="img"
          height="250"
          image="http://res.cloudinary.com/dnlooxokf/image/upload/v1653768230/images/akmhyfybmuln9t8fwi4y.webp"
          alt="green iguana"
          />

        <ListItemText
          primary="hola"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {price}100000
              </Typography>
              {/*" — I'll be in your neighborhood doing errands this…"*/}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
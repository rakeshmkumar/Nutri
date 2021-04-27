import React,{Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';
import ImageDisplay from './components/ImageDisplay/ImageDisplay';
import FoodItem from './components/FoodItem/FoodItem';

const initialState = {
  input: '',
  imageUrl: '',
  item1: '',
  item2: '',
  item3: '',
  item4: '',
  item5: '',
  items:[]
    // item6: '',
    // item7: '',
    // item8: '',
    // item9: '',
    // item10: '',
}

const app = new Clarifai.App({
  apiKey: '4329822d12914ec9b67e15243084cbd0'
});

const Particleoptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true, 
        value_area: 1000
      }
    }
  }
}

let itemsToShow = [];

class App extends Component {
  constructor() {
    super();
    this.state=initialState;
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    
    //this.setState({item1:'',item2:'',item3:'',item4:'',item5:''});
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FOOD_MODEL, this.state.imageUrl).then(
    function(response) {
      // console.log(response);
      // console.log(JSON.stringify(response.outputs));
      var i;
      for(i=0;i<response.rawData.outputs[0].data.concepts.length;i++)
       {
         itemsToShow.push(JSON.stringify(response.rawData.outputs[0].data.concepts[i].name))
       }
      
       console.log(itemsToShow);
      //  this.setState({
      //   items:itemsToShow
      // })
      // this.setProps(JSON.stringify(response.rawData.outputs[0].data.concepts[0].name),
      //   response.rawData.outputs[0].data.concepts[1].name,
      //   response.rawData.outputs[0].data.concepts[2].name,
      //   response.rawData.outputs[0].data.concepts[3].name,
      //   response.rawData.outputs[0].data.concepts[4].name
      //   );
    });
}

  render() {
    return (
    <div className="App">
      <div className='Container'>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <ImageDisplay imageUrl={this.state.imageUrl} />
        <h1> {this.state.item1} </h1>
        <FoodItem itemsToShow = {itemsToShow} />
        {itemsToShow=[]}
      </div>
      {/* <Particles className='particles' params={Particleoptions} /> */}
    </div>
  );
  }
}

export default App;

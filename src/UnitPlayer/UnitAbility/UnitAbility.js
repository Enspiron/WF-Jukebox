import * as React from "react";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

function UnitAbility(props) {
    const [nestedTabValue, setNestedTabValue] = React.useState(0);

    const handleNestedTabChange = (event, newValue) => {
      setNestedTabValue(newValue);
    };

    return (
        <div>
            {props.unit.ENName}
            <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList>
        <Tab>Lead/Skill</Tab>
        <Tab>Manaboard 1</Tab>
        <Tab>Manaboard 2</Tab>
      </TabList>
      <TabPanel value={1}>
        <Tabs
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{ minWidth: 500, height: 160 }}
          value={nestedTabValue}
          onChange={handleNestedTabChange}
        >
          <TabList
                    sx={({ minWidth: 150})}

          >
            <Tab>Ability 1</Tab>
            <Tab>Ability 2</Tab>
            <Tab>Ability 3</Tab>
          </TabList>
          <TabPanel value={0}>{props.unit.Ability1}</TabPanel>
          <TabPanel value={1}>{props.unit.Ability2}</TabPanel>
          <TabPanel value={2}>{props.unit.Ability3}</TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel value={2}>
        <Tabs
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{ minWidth: 300, height: 160 }}
          value={nestedTabValue}
          onChange={handleNestedTabChange}
        >
          <TabList
                    sx={({ minWidth: 150})}

          >
            <Tab>Ability 4</Tab>
            <Tab>Ability 5</Tab>
            <Tab>Ability 6</Tab>
          </TabList>
          <TabPanel value={0}>{props.unit.Ability4}</TabPanel>
          <TabPanel value={1}>{props.unit.Ability5}</TabPanel>
          <TabPanel value={2}>{props.unit.Ability6}</TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel value={0}>
        <Tabs
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{ minWidth: 600, height: 160 }}
          value={nestedTabValue}
          onChange={handleNestedTabChange}
        >
          <TabList
          sx={({ minWidth: 150})}
          >
            <Tab>Leader Ability</Tab>
            <Tab>Skill Ability</Tab>
          </TabList>
          <TabPanel value={0}>{props.unit.LeaderBuff}</TabPanel>
          <TabPanel value={1}>{props.unit.Skill}</TabPanel>
        </Tabs>
      </TabPanel>
    </Tabs>
        </div>
    )
}

export default UnitAbility;
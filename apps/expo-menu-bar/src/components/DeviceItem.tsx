import {StyleSheet, Pressable, PlatformColor} from 'react-native';
import {useState} from 'react';

import {Device} from '../utils/device';
import {Row, View} from './View';
import {Text} from './Text';
import IphoneIcon from '../assets/icons/iphone.svg';
import {useExpoTheme} from '../utils/useExpoTheme';
import Button from './Button';

interface Props {
  device: Device;
  onPress: () => void;
  onPressLaunch: () => void;
  selected?: boolean;
}

const DeviceItem = ({device, onPress, onPressLaunch, selected}: Props) => {
  const theme = useExpoTheme();
  const [hovering, setHovering] = useState(false);

  return (
    <Pressable
      style={[
        styles.row,
        hovering ? {backgroundColor: `${theme.code.comment}50`} : null,
      ]}
      onPress={onPress}
      onHoverIn={() => setHovering(true)}
      onHoverOut={() => setHovering(false)}>
      <Row flex="1" px="medium" align="center">
        <Row flex="1">
          <View
            rounded="full"
            align="centered"
            style={[
              styles.circle,
              {
                backgroundColor: selected
                  ? PlatformColor('controlAccentColor')
                  : PlatformColor('placeholderTextColor'),
              },
            ]}>
            <IphoneIcon height={36} width={36} />
          </View>
          <View flex="1" justify="center">
            <Text numberOfLines={1}>{device.name}</Text>
            <Text style={styles.description} color="secondary">
              {device.osType} {device.osVersion} - {device.state ?? 'Connected'}
            </Text>
          </View>
        </Row>
        {hovering && device.state === 'Shutdown' ? (
          <Button color="primary" onPress={onPressLaunch}>
            Launch
          </Button>
        ) : null}
      </Row>
    </Pressable>
  );
};

export default DeviceItem;

const styles = StyleSheet.create({
  row: {
    height: 46,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  circle: {width: 36, height: 36, marginRight: 8},
  description: {
    fontSize: 11,
    lineHeight: 11,
    opacity: 0.8,
  },
});

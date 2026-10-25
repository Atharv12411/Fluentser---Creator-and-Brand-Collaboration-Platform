import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Tab = 'Home' | 'Profile' | 'Connect';
const ink = '#222923';
const green = '#244f3d';
const showDesktopPhoneFrame = Platform.OS === 'web' && typeof window !== 'undefined' && window.innerWidth >= 600;

function LegacyApp() {
  const [tab, setTab] = useState<Tab>('Home');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState('');
  const [publicProfile, setPublicProfile] = useState(false);
  const [platform, setPlatform] = useState<'YouTube' | 'Instagram'>('YouTube');
  const [profileLink, setProfileLink] = useState('');
  const [consent, setConsent] = useState(false);
  const [connected, setConnected] = useState(false);
  const [notice, setNotice] = useState('');

  const saveProfile = () => setNotice(name.trim() ? 'Your creator profile is saved on this device.' : 'Add your display name to save your profile.');
  const connectProfile = () => {
    if (!profileLink.trim() || !consent) { setNotice('Add your profile link and confirm consent to continue.'); return; }
    setConnected(true);
    setNotice(`${platform} link saved. Provider metrics will be added when the authorized sync is configured.`);
  };

  return <View style={showDesktopPhoneFrame ? s.previewCanvas : s.webRoot}><SafeAreaView style={[s.safe, showDesktopPhoneFrame && s.phoneFrame]}>
    <StatusBar barStyle="dark-content" backgroundColor="#f7f6f3" />
    <View style={s.header}><View style={s.wordmark}><View style={s.mark}><Text style={s.markText}>f</Text></View><Text style={s.brand}>fluentser</Text></View><View style={s.creatorBadge}><View style={s.dot}/><Text style={s.badgeText}>CREATOR</Text></View></View>
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Text style={s.eyebrow}>YOUR CREATOR SPACE</Text>
      <Text style={s.title}>{tab === 'Home' ? <>Create work that{ '\n' }<Text style={s.titleAccent}>feels like you.</Text></> : tab === 'Profile' ? 'Your profile' : 'Your social links'}</Text>
      <Text style={s.subtitle}>{tab === 'Home' ? 'Set up your profile and choose what you share. Your creator journey starts here.' : tab === 'Profile' ? 'You control what brands can see on your Fluentser profile.' : 'Connect a profile you own. Fluentser only uses it with your permission.'}</Text>

      {notice ? <View style={s.notice}><Text style={s.noticeText}>{notice}</Text><TouchableOpacity onPress={() => setNotice('')}><Text style={s.dismiss}>×</Text></TouchableOpacity></View> : null}

      {tab === 'Home' && <>
        <View style={s.welcomeCard}><View style={s.welcomeTop}><Text style={s.welcomeTag}>A GOOD PLACE TO BEGIN</Text><Text style={s.spark}>✳</Text></View><Text style={s.cardTitle}>Your voice. Your pace.</Text><Text style={s.cardBody}>Build a creator profile, connect your channels when you’re ready, and decide whether brands can discover you.</Text><TouchableOpacity style={s.darkButton} onPress={() => setTab('Profile')}><Text style={s.darkButtonText}>Set up my profile  →</Text></TouchableOpacity></View>
        <Text style={s.sectionLabel}>YOUR NEXT STEPS</Text>
        <Step number="01" title="Create your profile" detail="Add your name, bio, and content niche." done={Boolean(name)} onPress={() => setTab('Profile')} />
        <Step number="02" title="Connect a social profile" detail="Share a link and grant permission first." done={connected} onPress={() => setTab('Connect')} />
        <Step number="03" title="Choose profile visibility" detail={publicProfile ? 'Your profile is set to public.' : 'Stay private until you choose to be discovered.'} done={publicProfile} onPress={() => setTab('Profile')} />
        <View style={s.privacyCard}><Text style={s.privacyIcon}>◈</Text><View style={{ flex: 1 }}><Text style={s.privacyTitle}>You’re in control</Text><Text style={s.privacyBody}>Your data is collected from the links you provide, with your consent. You choose whether your profile is public.</Text></View></View>
      </>}

      {tab === 'Profile' && <View style={s.formCard}><Text style={s.formTitle}>About you</Text><Text style={s.formHint}>Tell brands what makes your community yours.</Text>
        <Field label="DISPLAY NAME" value={name} onChangeText={setName} placeholder="How should we introduce you?" />
        <Field label="CONTENT NICHE" value={niche} onChangeText={setNiche} placeholder="Food, travel, gaming…" />
        <Field label="A SHORT BIO" value={bio} onChangeText={setBio} placeholder="What do you create, and who is it for?" multiline />
        <View style={s.visibilityRow}><View style={{ flex: 1, paddingRight: 12 }}><Text style={s.visibilityTitle}>Show me in brand discovery</Text><Text style={s.visibilityHint}>{publicProfile ? 'Your profile can be found by brands.' : 'Your profile stays private.'}</Text></View><Switch value={publicProfile} onValueChange={setPublicProfile} trackColor={{ false: '#d8d8d2', true: '#8eb29c' }} thumbColor={publicProfile ? green : '#f7f7f4'} /></View>
        <TouchableOpacity style={s.primaryButton} onPress={saveProfile}><Text style={s.primaryText}>Save my profile  →</Text></TouchableOpacity>
      </View>}

      {tab === 'Connect' && <View style={s.formCard}><Text style={s.formTitle}>Connect your channel</Text><Text style={s.formHint}>Use a profile you own or manage. A link by itself doesn’t grant access to private insights.</Text>
        <Text style={s.fieldLabel}>PLATFORM</Text><View style={s.segment}><TouchableOpacity onPress={() => setPlatform('YouTube')} style={[s.segmentItem, platform === 'YouTube' && s.segmentSelected]}><Text style={[s.segmentText, platform === 'YouTube' && s.segmentTextSelected]}>▶  YouTube</Text></TouchableOpacity><TouchableOpacity onPress={() => setPlatform('Instagram')} style={[s.segmentItem, platform === 'Instagram' && s.segmentSelected]}><Text style={[s.segmentText, platform === 'Instagram' && s.segmentTextSelected]}>◎  Instagram</Text></TouchableOpacity></View>
        <Field label="YOUR PROFILE LINK" value={profileLink} onChangeText={setProfileLink} placeholder={platform === 'YouTube' ? 'youtube.com/@yourchannel' : 'instagram.com/yourhandle'} autoCapitalize="none" />
        <TouchableOpacity style={s.consentRow} onPress={() => setConsent(!consent)}><View style={[s.checkbox, consent && s.checkboxSelected]}>{consent ? <Text style={s.check}>✓</Text> : null}</View><Text style={s.consentText}>I own or manage this profile and authorize Fluentser to retrieve and store the data available through the connected provider.</Text></TouchableOpacity>
        <TouchableOpacity style={[s.primaryButton, !consent && s.buttonMuted]} onPress={connectProfile}><Text style={s.primaryText}>Save link and consent  →</Text></TouchableOpacity>
        {connected && <View style={s.connectedCard}><Text style={s.connectedTitle}>✓  Link saved</Text><Text style={s.connectedBody}>{platform} · {profileLink}</Text><Text style={s.connectedBody}>Sync status: waiting for provider configuration</Text></View>}
        <View style={s.noteCard}><Text style={s.noteTitle}>What happens next?</Text><Text style={s.noteBody}>Fluentser saves your link and consent. YouTube metrics require the server API key. Instagram metrics require an authorized Meta sign-in; a link alone stays unverified.</Text></View>
      </View>}
      <Text style={s.footer}>FLUENTSER  ·  YOUR CREATOR JOURNEY</Text>
    </ScrollView>
    <View style={s.tabBar}>{(['Home', 'Profile', 'Connect'] as Tab[]).map((item, i) => <TouchableOpacity key={item} style={s.tab} onPress={() => { setTab(item); setNotice(''); }}><Text style={[s.tabIcon, tab === item && s.tabActive]}>{['⌂', '○', '↗'][i]}</Text><Text style={[s.tabText, tab === item && s.tabTextActive]}>{item}</Text></TouchableOpacity>)}</View>
  </SafeAreaView></View>;
}

function Step({number,title,detail,done,onPress}:{number:string;title:string;detail:string;done:boolean;onPress:()=>void}) { return <TouchableOpacity style={s.step} onPress={onPress}><View style={[s.stepNumber, done && s.stepDone]}><Text style={[s.stepNumberText, done && s.stepDoneText]}>{done ? '✓' : number}</Text></View><View style={{ flex: 1 }}><Text style={s.stepTitle}>{title}</Text><Text style={s.stepDetail}>{detail}</Text></View><Text style={s.chevron}>›</Text></TouchableOpacity>; }
function Field(props: React.ComponentProps<typeof TextInput> & {label:string}) { return <View style={s.field}><Text style={s.fieldLabel}>{props.label}</Text><TextInput {...props} style={[s.input, props.multiline && s.multiline]} placeholderTextColor="#9b9c92" /></View>; }

const s = StyleSheet.create({
  webRoot:{flex:1},previewCanvas:{flex:1,backgroundColor:'#e4e7e1',alignItems:'center',justifyContent:'center',padding:12},phoneFrame:{flex:1,width:'100%',maxWidth:390,height:'100%',maxHeight:844,borderWidth:8,borderColor:'#252b27',borderRadius:38,overflow:'hidden',backgroundColor:'#f7f6f3',shadowColor:'#000',shadowOpacity:.22,shadowRadius:26,shadowOffset:{width:0,height:10},elevation:8},safe:{flex:1,backgroundColor:'#f7f6f3'}, header:{height:62,paddingHorizontal:22,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#e9e8e2'},wordmark:{flexDirection:'row',alignItems:'center',gap:9},mark:{width:29,height:29,backgroundColor:green,borderRadius:9,alignItems:'center',justifyContent:'center'},markText:{fontSize:23,fontWeight:'700',color:'#fff',fontFamily:'Georgia'},brand:{fontSize:18,fontWeight:'700',letterSpacing:-.6,color:ink},creatorBadge:{flexDirection:'row',alignItems:'center',gap:7,backgroundColor:'#e9eee9',paddingVertical:7,paddingHorizontal:10,borderRadius:20},dot:{width:6,height:6,borderRadius:4,backgroundColor:'#4c8c68'},badgeText:{fontSize:9,letterSpacing:1.1,color:green,fontWeight:'800'},content:{paddingHorizontal:22,paddingTop:27,paddingBottom:28,maxWidth:600,width:'100%',alignSelf:'center'},eyebrow:{fontSize:9,fontWeight:'800',letterSpacing:1.7,color:'#718074'},title:{fontSize:34,lineHeight:39,fontFamily:'Georgia',letterSpacing:-1.2,color:ink,marginTop:10},titleAccent:{color:green,fontStyle:'italic'},subtitle:{fontSize:13,lineHeight:20,color:'#71746e',marginTop:11,marginBottom:21,maxWidth:410},welcomeCard:{backgroundColor:'#e6ece5',borderRadius:16,padding:19,marginBottom:25,borderWidth:1,borderColor:'#dce5dc'},welcomeTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},welcomeTag:{fontSize:8,fontWeight:'800',letterSpacing:1.4,color:'#627868'},spark:{fontSize:23,color:'#567a5e'},cardTitle:{fontSize:23,fontFamily:'Georgia',color:ink,marginTop:16},cardBody:{fontSize:12,lineHeight:18,color:'#69736b',marginTop:6,maxWidth:360},darkButton:{alignSelf:'flex-start',backgroundColor:green,borderRadius:8,paddingVertical:12,paddingHorizontal:15,marginTop:17},darkButtonText:{fontSize:11,fontWeight:'700',color:'#fff'},sectionLabel:{fontSize:9,letterSpacing:1.4,fontWeight:'800',color:'#8b8e83',marginBottom:8},step:{flexDirection:'row',alignItems:'center',gap:12,paddingVertical:13,borderBottomWidth:1,borderBottomColor:'#e9e8e2'},stepNumber:{height:29,width:29,borderRadius:10,borderWidth:1,borderColor:'#d9dad1',alignItems:'center',justifyContent:'center'},stepNumberText:{fontSize:9,color:'#777b70',fontWeight:'700'},stepDone:{backgroundColor:'#e3eee5',borderColor:'#cddfce'},stepDoneText:{color:green,fontSize:13},stepTitle:{fontSize:12,color:ink,fontWeight:'700'},stepDetail:{fontSize:10,color:'#81847b',marginTop:3},chevron:{fontSize:22,color:'#a3a59c'},privacyCard:{flexDirection:'row',gap:12,backgroundColor:'#f0efe8',borderRadius:12,padding:14,marginTop:22},privacyIcon:{fontSize:20,color:green},privacyTitle:{fontSize:11,fontWeight:'700',color:ink},privacyBody:{fontSize:10,lineHeight:16,color:'#777a71',marginTop:4},formCard:{padding:17,backgroundColor:'#fff',borderRadius:14,borderWidth:1,borderColor:'#ecebe5'},formTitle:{fontSize:18,fontFamily:'Georgia',color:ink},formHint:{fontSize:11,lineHeight:17,color:'#81837b',marginTop:5,marginBottom:14},field:{marginTop:12},fieldLabel:{fontSize:8,fontWeight:'800',letterSpacing:1,color:'#777b70',marginBottom:6},input:{height:43,borderWidth:1,borderColor:'#e5e5de',borderRadius:8,paddingHorizontal:11,color:ink,fontSize:12,backgroundColor:'#fbfbf9'},multiline:{height:91,paddingTop:11,textAlignVertical:'top'},visibilityRow:{flexDirection:'row',alignItems:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#eeede8',marginTop:17,paddingVertical:13},visibilityTitle:{fontSize:11,fontWeight:'700',color:ink},visibilityHint:{fontSize:10,color:'#81837b',marginTop:4},primaryButton:{height:45,backgroundColor:green,borderRadius:8,alignItems:'center',justifyContent:'center',marginTop:16},primaryText:{fontSize:11,fontWeight:'700',color:'#fff'},segment:{flexDirection:'row',backgroundColor:'#f2f2ed',padding:3,borderRadius:9},segmentItem:{flex:1,height:35,alignItems:'center',justifyContent:'center',borderRadius:7},segmentSelected:{backgroundColor:'#fff',elevation:1},segmentText:{fontSize:10,color:'#74776d',fontWeight:'600'},segmentTextSelected:{color:green,fontWeight:'800'},consentRow:{flexDirection:'row',gap:10,alignItems:'flex-start',marginTop:17},checkbox:{width:18,height:18,borderWidth:1,borderColor:'#c8cbc0',borderRadius:5,alignItems:'center',justifyContent:'center'},checkboxSelected:{backgroundColor:green,borderColor:green},check:{fontSize:12,color:'#fff',fontWeight:'800'},consentText:{flex:1,fontSize:10,lineHeight:16,color:'#6f7269'},buttonMuted:{opacity:.58},connectedCard:{backgroundColor:'#edf4ed',borderRadius:9,padding:12,marginTop:13},connectedTitle:{fontSize:11,color:green,fontWeight:'800'},connectedBody:{fontSize:10,color:'#667469',marginTop:5},noteCard:{backgroundColor:'#f3f2ed',borderRadius:9,padding:12,marginTop:13},noteTitle:{fontSize:10,fontWeight:'800',color:'#565d54'},noteBody:{fontSize:10,lineHeight:16,color:'#7b7e74',marginTop:4},notice:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#e9eee9',borderRadius:8,padding:10,marginBottom:14},noticeText:{fontSize:10,color:green,flex:1},dismiss:{fontSize:18,color:green,paddingHorizontal:5},footer:{textAlign:'center',fontSize:8,letterSpacing:1.2,color:'#a0a197',marginTop:29,marginBottom:10},tabBar:{height:64,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#e9e8e2',flexDirection:'row',justifyContent:'space-around',paddingHorizontal:18,paddingTop:6},tab:{alignItems:'center',justifyContent:'center',minWidth:70,gap:2},tabIcon:{fontSize:18,color:'#96998f'},tabActive:{color:green},tabText:{fontSize:9,color:'#96998f'},tabTextActive:{color:green,fontWeight:'800'}
});

export { default } from './CreatorApp';

